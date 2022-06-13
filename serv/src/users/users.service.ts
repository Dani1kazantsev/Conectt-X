import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "./users.entity";
import {CreateUserDto} from "../otherwise/DTOS/create-user.dto";
import { Repository} from "typeorm";
import {RoleEntity} from "../roles/roles.entity";
import {RolesService} from "../roles/roles.service";
import * as fs from "fs";
import {MessageService} from "../message/message.service";
import {CreateMessageDto} from "../otherwise/DTOS/create-message.dto";
import {SocketService} from "../socket/socket.service";
import {SocketDto} from "../otherwise/DTOS/socket.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity)
                private userRepository:Repository<UsersEntity>,
                private rolesService:RolesService,
                private messageService:MessageService,
                protected socketService:SocketService) {
    }
    async createUser(dto:CreateUserDto){
        try {
            const role:RoleEntity = await this.rolesService.findRoleByValue('User');
            const user = await this.userRepository.save(dto)
            user.roles.push(role)
            return await this.userRepository.save(user);
        }catch (e) {
            return e;
        }

    }
    async getAllUsers(){
        const users = await this.userRepository.find({ relations: [
            "roles", "messages","friends"] });
        return users;
    }
    async addRoleToUser(roleValue:string, userId:number){
        const role:RoleEntity = await this.rolesService.findRoleByValue(roleValue)
        let user = await this.userRepository.findOne({
            where:{id:userId},
            relations:["roles"]
        });
        if(user.roles.find(item=>item.value === role.value)){
            return user;
        }
        user.roles.push(role)
        user = await this.userRepository.save(user)
        return user;
    }
    async getUserByEmail(email:string){
        const user = await this.userRepository.findOne({where:{email:email},
            relations: ["roles", "messages","friends"]})
        return user
    }
    async getUserByParams(params:Array<object>){
        const user:UsersEntity = await this.userRepository.findOne({
            where:params,
            relations: ["roles", "messages","friends"]
        })
        return user
    }
    async getUserById(id:number){
        const user:UsersEntity = await this.userRepository.findOne({
            where:{id:id},
            relations: ["roles","friends","friends.messages","chat"]
        })
        for (const friend of user.friends) {
            delete friend['password']
            delete friend['activationLink']
            delete friend['isActivated']
            delete friend['refreshToken']
            friend.messages = await this.messageService.getMessageOfUsers(friend.id,user.id)
        }
        return user
    }
    async saveUsers(users:UsersEntity[]){
        const returnUsers:Array<UsersEntity> = []
        for (let i = 0; i < users.length; i++) {
            let user = await this.userRepository.save(users[i]);
            returnUsers.push(user)
        }
        return returnUsers;
    }
    async addFriend(myId,userId){
        const user:UsersEntity = await this.userRepository.findOne({
            where:{id:myId},
            relations:["friends","friends.messages"]
        })

        const friend = await this.userRepository.findOne({where:{id:userId},relations:{messages:true,friends:true}})
        delete friend.password
        delete friend.activationLink
        delete friend.isActivated
        delete friend.refreshToken
        delete user.password

        delete user.activationLink
        delete user.isActivated
        delete user.refreshToken
        if(!user.friends.find(item=> item.id == userId)
            &&userId !== myId){
            user.friends.push(friend)
            friend.friends.push(user)
            await this.userRepository.save(friend)
            return await this.userRepository.save(user)
        }
        return user
    }
    async refreshToken(){

    }

    async activateAccount(link){
        const user:UsersEntity = await this.userRepository.findOne({
            where:{activationLink:link}
        })
        if(!user) throw new HttpException('Неправильная ссылка.',HttpStatus.BAD_REQUEST)
        user.isActivated = true
        return await this.userRepository.save(user)
    }

    async uploadAvatar(file,myId){
        const user = await this.userRepository.findOne({where: {id: myId}})
        fs.unlink(`./clientFiles/images/avatars/${user.avatar}`, function(err){
            if (err) {
                return err
            }
        });
        user.avatar = file.filename
        return await this.userRepository.save(user)
    }
    async sendMessages(messageDto: CreateMessageDto){
        const message = await this.messageService.createMessage(messageDto)
        const fromUser:UsersEntity = await this.userRepository.findOne({where:{id:messageDto.fromUserId},relations:{messages: true}})
        const toUser:UsersEntity = await this.userRepository.findOne({where:{id:messageDto.toUserId},relations:{messages: true}})
        fromUser.messages.push(message)
        toUser.messages.push(message)
        await this.saveUsers([fromUser,toUser])
        return message
    }

    async createChat(socketDto:SocketDto,myId){
        const user = await this.userRepository.findOne({where:{id:myId}})
        const socket = await this.socketService.createSocket(socketDto)
        user.chat = socket
        return await this.userRepository.save(user)
    }

    async updateChat(socketId,myId){
        const user = await this.userRepository.findOne({where:{id:myId},relations:{chat:true}})
        user.chat.socketId = socketId
        return await this.socketService.updateSocket(user.chat)
    }
}
