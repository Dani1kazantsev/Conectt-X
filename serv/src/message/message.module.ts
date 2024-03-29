import { Module } from '@nestjs/common';
import {MessageService} from "./message.service";
import {MessageController} from "./message.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessageEntity} from "./message.entity";
import {JwtModule} from "@nestjs/jwt";


@Module({
    providers: [MessageService],
    controllers: [MessageController],
    imports:[TypeOrmModule.forFeature([MessageEntity]),JwtModule],
    exports:[MessageService]
})
export class MessageModule {}
