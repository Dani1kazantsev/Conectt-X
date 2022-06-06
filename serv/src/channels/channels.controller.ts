import {Body, Controller, Param, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {ChannelsService} from "./channels.service";
import {CreateChannelDto} from "../otherwise/DTOS/create-channel.dto";

@ApiTags('Каналы')
@Controller('channels')
export class ChannelsController {
    constructor(private channelsService:ChannelsService) {
    }
    @Post()
    createChannel(@Body() channelsDto: CreateChannelDto){
        return this.channelsService.createChannels(channelsDto)
    }
}
