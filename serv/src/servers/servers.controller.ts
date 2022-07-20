import {Body, Controller, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {ServersService} from "./servers.service";
import {CreateServerDto} from "../otherwise/DTOS/create-server.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('servers')
export class ServersController {
    constructor(private serversService:ServersService) {
    }
    @Post()
    createServer(@Body() ServerDto: CreateServerDto){
        return this.serversService.createServer(ServerDto)
    }
    @Get('addUser:/id')
    @UseGuards(JwtAuthGuard)
    addUser(@Param('id')id:number,@Req()req){
        return this.serversService.addUser(id,req['user'].id)
    }
    @ApiOperation({summary:"Установка аватарки на сервер"})
    @UseGuards(JwtAuthGuard)
    @Put('/avatar')
    @UseInterceptors(
        FileInterceptor('avatar', {
        })
    )
    editAvatar(@UploadedFile() avatar: Express.Multer.File,@Req() req) {
        console.log(avatar)
    }
}
