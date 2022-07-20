import {Body, Controller, Get, Param, Post, Put, Req, UseGuards, UseInterceptors} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {ChannelsService} from "./channels.service";
import {CreateChannelDto} from "../otherwise/DTOS/create-channel.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CreateFilesDto} from "../otherwise/DTOS/create-files.dto";
import {UpdateFileDto} from "../otherwise/DTOS/update-file.dto";
import {CreateDirectoryDto} from "../otherwise/DTOS/create-directory.dto";
import {pathToArray} from "graphql/jsutils/Path";

@ApiTags('Каналы')
@Controller('channels')
export class ChannelsController {
    constructor(private channelsService: ChannelsService) {
    }

    @Post()
    createChannel(@Body() channelsDto: CreateChannelDto) {
        return this.channelsService.createChannels(channelsDto)
    }

    @Post('/createFile')
    @UseGuards(JwtAuthGuard)
    createFile(@Req() req,
               @Body() dto: CreateFilesDto) {
        return this.channelsService.createFile(dto, req['user'].login)
    }

    @Put('/updateFile')
    @UseGuards(JwtAuthGuard)
    updateFile(@Req() req,
               @Body() dto: UpdateFileDto) {
        return this.channelsService.updateFile(dto)
    }

    @Get('/getFileData:id')
    @UseGuards(JwtAuthGuard)
    getFile(@Param('id') id: number, @Param('channelId') channelId: number) {
        return this.channelsService.getFileData(id)
    }

    @Get('/getFileDataByPath/:path')
    getFileByPath(@Param('path') path:string) {
        return this.channelsService.getFileDataByPath(path.split(',').join('/'))
    }

    @Post('/createDirectory')
    @UseGuards(JwtAuthGuard)
    createDirectory(@Req() req, @Body() dto: CreateDirectoryDto) {
        if (dto.path) {
            return this.channelsService.createDirectory(dto.name, dto.channelId, undefined, dto.path)
        }
        return this.channelsService.createDirectory(dto.name, dto.channelId, dto.directoryId, undefined)
    }
}
