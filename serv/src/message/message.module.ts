import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoleEntity} from "../roles/roles.entity";
import {UserEntity} from "../users/users.entity";
import {MessageEntity} from "./message.entity";
import {MessageResolver} from "./message.resolver";


@Module({
  providers: [MessageService,MessageResolver],
  controllers: [MessageController],
  imports:[
      TypeOrmModule.forFeature([UserEntity,RoleEntity,MessageEntity]),
      UsersModule,AuthModule
  ],
    exports:[MessageService]
})
export class MessageModule {}
