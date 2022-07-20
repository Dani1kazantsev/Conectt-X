import {BadRequestException, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "./users.entity";
import {CreateUserDto} from "../otherwise/DTOS/create-user.dto";
import {Repository} from "typeorm";
import {RoleEntity} from "../roles/roles.entity";
import {RolesService} from "../roles/roles.service";
import * as fs from "fs";
import {MessageService} from "../message/message.service";
import {CreateMessageDto} from "../otherwise/DTOS/create-message.dto";
import {SocketService} from "../socket/socket.service";
import {SocketDto} from "../otherwise/DTOS/socket.dto";
import {unnecessaryAttributes} from "../otherwise/helpers/constants";
import * as path from "path";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity)
                private userRepository: Repository<UsersEntity>,
                private rolesService: RolesService,
                private messageService: MessageService,
                protected socketService: SocketService,) {
    }

    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.userRepository.save(dto)
            await this.userRepository.save(user);
            return await this.userRepository.findOne({
                where: {
                    id: user.id
                },
                relations:{
                    directory:true
                }
            })
        } catch (e) {
            return e;
        }

    }

    async getAllUsers() {
        const users = await this.userRepository.find({
            relations: [
                "roles", "messages", "friends"]
        });
        return users;
    }

    async addRoleToUser(roleValue: string, userId: number) {
        const role: RoleEntity = await this.rolesService.findRoleByValue(roleValue)
        let user = await this.userRepository.findOne({
            where: {id: userId},
            relations: ["roles"]
        });
        if (user.roles.find(item => item.value === role.value)) {
            return user;
        }
        user.roles.push(role)
        user = await this.userRepository.save(user)
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {email: email},
            relations: ["roles", "messages", "friends"]
        })
        return user
    }

    async getUserByParams(params: Array<object>) {
        const user: UsersEntity = await this.userRepository.findOne({
            where: params,
            relations: ["roles", "messages", "friends"]
        })
        return user
    }

    async getMeById(id: number) {
        let myUnnecessaryAttributes = []
        for (let attr of unnecessaryAttributes) {
            myUnnecessaryAttributes.push(attr)
        }
        myUnnecessaryAttributes.push('lastOpenedChat')
        const user: UsersEntity = await this.userRepository.findOne({
            where: {id: id},
            relations: ["directory", "friends", "friends.messages", "chat", "servers","servers.directory",
                "servers.channels", "servers.channels.server", "servers.channels.directories",
                "servers.channels.directories.files", "servers.channels.directories.files.channel",
                "servers.channels.directories.files.directory"]
        })
        for (let friend of user.friends) {
            friend = this.filterUser(friend, myUnnecessaryAttributes)
            friend.messages = await this.messageService.getMessageOfUsers(friend.id, user.id)
        }
        return user
    }

    async getUserById(id: number) {
        const user: UsersEntity = await this.userRepository.findOne({
            where: {id: id},
            relations:{
                servers:true,
                directory:true
            }
        })
        return user
    }

    async saveUsers(users: UsersEntity[]) {
        const returnUsers: Array<UsersEntity> = []
        for (let i = 0; i < users.length; i++) {
            let user = await this.userRepository.save(users[i]);
            returnUsers.push(user)
        }
        return returnUsers;
    }

    filterUser(user, arrayOfAttributes) {
        for (let i = 0; i < arrayOfAttributes.length; i++) {
            delete user [arrayOfAttributes[i]]
        }
        return user
    }

    async addFriend(myId, userId) {
        try {
            if (myId == userId) {
                return
            }
            let user = await this.userRepository.findOne({
                where: {id: myId},
                relations: ["friends", "friends.messages","messages"]
            })
            const friend = await this.userRepository.findOne({
                where: {id: userId},
                relations: {messages: true, friends: true}
            })
            if(user.friends.length > 0){
                for (let i = 0; i < user.friends.length; i++) {
                    if(user.friends[i].id == userId){
                        throw new BadRequestException('Есть такой друг')
                    }
                }
            }
            friend.friends.push(user)
            await this.userRepository.save(friend)
            delete friend.friends
            user.friends.push(friend)
            await this.userRepository.save(user)
            return user
        } catch (e) {
            console.log(e)
        }

    }

    async refreshToken() {

    }

    async activateAccount(link) {
        const user: UsersEntity = await this.userRepository.findOne({
            where: {activationLink: link}
        })
        if (!user) throw new HttpException('Неправильная ссылка.', HttpStatus.BAD_REQUEST)
        user.isActivated = true
        return await this.userRepository.save(user)
    }

    async uploadAvatar(file, myId) {
        const user = await this.userRepository.findOne({where: {id: myId}})
        fs.unlink(`./clientFiles/images/avatars/${user.avatar}`, function (err) {
            if (err) {
                return err
            }
        });
        user.avatar = file.filename
        return await this.userRepository.save(user)
    }

    async sendMessages(messageDto: CreateMessageDto) {
        const message = await this.messageService.createMessage(messageDto)
        const fromUser: UsersEntity = await this.userRepository.findOne({
            where: {id: messageDto.fromUserId},
            relations: {messages: true}
        })
        const toUser: UsersEntity = await this.userRepository.findOne({
            where: {id: messageDto.toUserId},
            relations: {messages: true}
        })
        fromUser.messages.push(message)
        toUser.messages.push(message)
        await this.saveUsers([fromUser, toUser])
        return message
    }

    async createChat(socketDto: SocketDto, myId) {
        const user = await this.userRepository.findOne({where: {id: myId}})
        const socket = await this.socketService.createSocket(socketDto)
        user.chat = socket
        return await this.userRepository.save(user)
    }

    async updateChat(socketId, myId) {
        const user = await this.userRepository.findOne({where: {id: myId}, relations: {chat: true}})
        user.chat.socketId = socketId
        return await this.socketService.updateSocket(user.chat)
    }

    async updateStatus(status, myId) {
        const user = await this.userRepository.findOne({where: {id: myId}})
        user.status = status
        return await this.userRepository.save(user)
    }

    async updateOpenedChat(dto, myId) {
        const user = await this.userRepository.findOne({where: {id: myId}})
        user.lastOpenedChat = dto.chat
        return await this.userRepository.save(user)
    }

    async getAvatar(id) {
        let user = await this.userRepository.findOne({where: {id: id}})
        let avatar = fs.readFileSync(path.resolve(__dirname, '../../clientFiles/images/avatars/') + '/' + user.avatar)
        const mimeType = 'image/jpg';
        return `data:${mimeType};base64,${avatar.toString('base64')}`
    }
}
