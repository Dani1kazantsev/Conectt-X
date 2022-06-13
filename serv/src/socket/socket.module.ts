import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SocketEntity} from "./socket.entity";

@Module({
  providers: [SocketService],
  controllers: [SocketController],
  imports:[TypeOrmModule.forFeature([SocketEntity])],
  exports:[SocketService]
})
export class SocketModule {}
