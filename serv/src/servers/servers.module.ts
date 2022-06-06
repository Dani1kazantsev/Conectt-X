import { Module } from '@nestjs/common';
import { ServersService } from './servers.service';
import { ServersController } from './servers.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ServersEntity} from "./servers.entity";
import {UsersModule} from "../users/users.module";

@Module({
  providers: [ServersService],
  controllers: [ServersController],
  imports:[TypeOrmModule.forFeature([ServersEntity]),UsersModule],
  exports:[ServersService]
})
export class ServersModule {}
