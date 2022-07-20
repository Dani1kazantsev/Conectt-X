import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../otherwise/DTOS/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {v4 as uuidv4} from 'uuid';
import {MailService} from "../mail/mail.service";
import {TokensService} from "../tokens/tokens.service";
import {UsersEntity} from "../users/users.entity";
import {loginUserDto} from "../otherwise/DTOS/login-user.dto";
import {MessageService} from "../message/message.service";
import {unnecessaryAttributes} from "../otherwise/helpers/constants";
import {ServersService} from "../servers/servers.service";
import {ChannelsService} from "../channels/channels.service";
import * as fs from "fs";
import {DirectoriesService} from "../directory/directories.service";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService,
                private mailService: MailService,
                private tokensService: TokensService,
                private messageService: MessageService,
                private serversService: ServersService,
                private channelsService: ChannelsService,
                private directoriesService: DirectoriesService
    ) {
    }

    async login(userDto: loginUserDto) {
        const user = await this.validateUser(userDto)
        for (let friend of user.friends) {
            friend = this.userService.filterUser(friend, unnecessaryAttributes)
            friend.messages = await this.messageService.getMessageOfUsers(friend.id, user.id)
        }
        let tokens = this.tokensService.generateToken(user)
        user.refreshToken = tokens.refreshToken
        this.userService.saveUsers([user])
        return tokens
    }

    async registration(userDto: CreateUserDto) {
        try {
            const candidateUser = await this.userService.getUserByParams([{email: userDto.email}, {login: userDto.login}]);
            if (candidateUser) {
                throw new BadRequestException("Пользователь с таким email или login уже есть.")
            }
            const hashPassword = await bcrypt.hash(userDto.password, 4)
            const activateLink = uuidv4()
            const user: UsersEntity = await this.userService.createUser({
                ...userDto,
                password: hashPassword,
                activationLink: activateLink
            })
            await this.mailService.sendMail(userDto.email, activateLink, userDto.login)
            const tokens = this.tokensService.generateToken(user)
            user.refreshToken = tokens.refreshToken
            const userDirectory = await this.directoriesService.saveDirectoryWithPath(user.login, `./clientFiles/users`)
            user.directory = userDirectory
            const server = await this.serversService.createServer({
                name: "myServer",
                type: "editor",
                directory: userDirectory,
                userId: user.id
            })
            await this.userService.saveUsers([user])
            const channel = await this.channelsService.createChannels({
                serverId: server.id,
                type: "editor",
                name: "myServerEditor"
            })
            const channelDirectory = await this.directoriesService.saveDirectory(channel.name, server.directory, channel.id)
            channel.directories.push(channelDirectory)

            await this.channelsService.saveChannel(channel)
            return tokens
        } catch (e) {
            return e
        }
    }

    private async validateUser(userDto: loginUserDto) {
        let passwordEqualsCheck: boolean
        const user = await this.userService.getUserByEmail(userDto.email)
        if (user) {
            passwordEqualsCheck = await bcrypt.compare(userDto.password, user.password)
            if (passwordEqualsCheck) {
                return user
            }
        }
        throw new UnauthorizedException({message: "Неправильный email или пароль"})
    }

    async activate(link) {
        const user: UsersEntity = await this.userService.getUserByParams([{activationLink: link}])
        if (user) {
            user.isActivated = true
            return await this.userService.saveUsers([user])
        }
        throw new Error('Неправильная ссылка')
    }

    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw new UnauthorizedException('Не авторизован')
        }
        const userData: UsersEntity = await this.tokensService.validateRefreshToken(refreshToken)
        if (!userData) {
            throw new UnauthorizedException('Не авторизован')
        }
        const user: UsersEntity = await this.userService.getUserById(userData.id)
        if (user.refreshToken != userData.refreshToken || !userData || !user) {
            throw new UnauthorizedException('Не авторизован')
        }
        const tokens = this.tokensService.generateToken(user)
        user.refreshToken = tokens.refreshToken
        this.userService.saveUsers([user])
        return tokens

    }
}