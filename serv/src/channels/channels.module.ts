import { Module } from '@nestjs/common';
import {ChannelsService} from "./channels.service";
import {ChannelsController} from "./channels.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ChannelsEntity} from "./channels.entity";
import {ServersModule} from "../servers/servers.module";

@Module({
    providers: [ChannelsService],
    controllers: [ChannelsController],
    imports:[TypeOrmModule.forFeature([ChannelsEntity]),ServersModule,],
    exports:[ChannelsService]
})
export class ChannelsModule {}
