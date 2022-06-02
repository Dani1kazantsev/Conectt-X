import { HttpException, HttpStatus, Injectable,UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../otherwise/DTOS/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import {MailService} from "../mail/mail.service";
import {TokensService} from "../tokens/tokens.service";
import {UserEntity} from "../users/users.entity";

@Injectable()
export class AuthService {

    constructor(private userService:UsersService,
                private jwtService:JwtService,
                private mailService:MailService,
                private tokensService:TokensService
                ) {
    }

    async login(userDto:CreateUserDto){
        const user = await this.validateUser(userDto)
        return this.tokensService.generateToken(user)
    }
    async registration(userDto:CreateUserDto){
        const candidateUser = await this.userService.getUserByEmail(userDto.email);
        if(candidateUser){
            throw new HttpException("Пользователь с таким email уже есть.",HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password,4)
        const activateLink = uuidv4()
        const user:UserEntity = await this.userService.createUser({...userDto,password:hashPassword,activationLink:activateLink})
        await this.mailService.sendMail(userDto.email,activateLink,userDto.login)
        const tokens = this.tokensService.generateToken(user)
        user.refreshToken = tokens.refreshToken
        return [tokens,user]
    }

    private async validateUser(userDto: CreateUserDto) {
        let passwordEqualsCheck:boolean
        const user = await this.userService.getUserByParams([{
            login:userDto.login,
            email:userDto.email}])
        if(user){
            passwordEqualsCheck = await bcrypt.compare(userDto.password,user.password)
            if(passwordEqualsCheck){
                return user
            }
        }
        throw new UnauthorizedException({message:"Неправильный email или пароль"})
    }
    async activate(link){
        const user:UserEntity = await this.userService.getUserByParams([{activationLink: link}])
        if(user){
            user.isActivated = true
            return await this.userService.saveUsers([user])
        }
        console.log(link,user)
        throw new Error('Неправильная ссылка')
    }
}