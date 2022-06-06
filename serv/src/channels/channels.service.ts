import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {getRepository, Repository} from "typeorm";
import {ChannelsEntity} from "./channels.entity";
import {CreateChannelDto} from "../otherwise/DTOS/create-channel.dto";
import {ServersService} from "../servers/servers.service";

@Injectable()
export class ChannelsService {
    constructor(@InjectRepository(ChannelsEntity)
                private channelsRepository:Repository<ChannelsEntity>,
                private serversService:ServersService ) {
    }
    async createChannels(channelsDto:CreateChannelDto){
        const channel = await this.channelsRepository.save(channelsDto)
        channel.server = await this.serversService.findById(channelsDto.serverId)
        return await this.channelsRepository.save(channel)
    }
}
