import {BadRequestException, Injectable, UseGuards} from '@nestjs/common';
import {CreateMessageDto} from "../otherwise/DTOS/create-message.dto";
import {UsersService} from "../users/users.service";
import {InjectRepository} from "@nestjs/typeorm";
import {MessageEntity} from "./message.entity";
import {Repository} from "typeorm";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Injectable()
@UseGuards(JwtAuthGuard)
export class MessageService {
    constructor(@InjectRepository(MessageEntity)
                private messageRepository:Repository<MessageEntity>,
    ) {
    }
    async createMessage(messageDto: CreateMessageDto) {
        const checkMessage = await this.messageRepository.findOne({where:{data:messageDto.data,text:messageDto.text,fromUserId:messageDto.fromUserId,toUserId:messageDto.toUserId}})
        if(!checkMessage){
            const message = await this.messageRepository.save(messageDto)
            return message;
        }
        throw new BadRequestException('ошибка')
    }
    async getMessages(){
        const messages:MessageEntity[] = await this.messageRepository.find()
        return messages;
    }
    async getUserMessages(userId){

    }
    async getMessageOfUsers(userId,myId){
        return await this.messageRepository.find({where:[{fromUserId:userId,toUserId:myId},{fromUserId:myId,toUserId:userId}]})
    }
    async saveMessages(arr){
        for(let msg of arr){
            this.messageRepository.save(arr)
        }
        return true
    }
}
