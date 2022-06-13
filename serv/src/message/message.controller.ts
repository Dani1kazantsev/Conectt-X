import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {UsersService} from "../users/users.service";
import {MessageService} from "./message.service";
import {CreateMessageDto} from "../otherwise/DTOS/create-message.dto";
import {MessageEntity} from "./message.entity";
import {ValidationPipe} from "../otherwise/pipes/validation.pipe";

@ApiTags('Сообщения')
@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
    constructor(
                private messageService:MessageService) {
    }
    @ApiOperation({summary:"Отправка сообщений"})
    @ApiResponse({status:200,type:MessageEntity})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body()messageDto:CreateMessageDto){
        return this.messageService.createMessage(messageDto)
    }
    @ApiOperation({summary:"Все сообщения"})
    @ApiResponse({status:200,type:MessageEntity})
    @Get()
    allMessages(){
        return this.messageService.getMessages()
    }
}
