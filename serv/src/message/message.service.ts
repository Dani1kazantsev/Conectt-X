import {Injectable, UseGuards} from '@nestjs/common';
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
                private userService:UsersService) {
    }
    async createMessage(messageDto: CreateMessageDto) {
        const message = await this.messageRepository.save(messageDto)
        const fromUser = await this.userService.getUserByParams([{id:messageDto.fromUserId}])
        const toUser = await this.userService.getUserByParams([{id:messageDto.toUserId}])
        fromUser.messages.push(message)
        toUser.messages.push(message)
        return message;
    }
    async getMessages(){
        const messages:MessageEntity[] = await this.messageRepository.find()
        return messages;
    }
    async getUserMessages(userId){
        const user = await this.userService.getUserById(userId)
        const messages:MessageEntity[] = user.messages
        return messages;
    }
}
