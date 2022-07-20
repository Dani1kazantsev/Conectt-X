import { Module } from '@nestjs/common';
import { ServersService } from './servers.service';
import { ServersController } from './servers.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ServersEntity} from "./servers.entity";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {DirectoriesModule} from "../directory/directories.module";

@Module({
  providers: [ServersService],
  controllers: [ServersController],
  imports:[TypeOrmModule.forFeature([ServersEntity]),UsersModule,JwtModule,DirectoriesModule],
  exports:[ServersService]
})
export class ServersModule {}
