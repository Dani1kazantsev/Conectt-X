import {Body, Controller, Param, Post} from '@nestjs/common';
import {ServersService} from "./servers.service";
import {CreateServerDto} from "../otherwise/DTOS/create-server.dto";

@Controller('servers')
export class ServersController {
    constructor(private serversService:ServersService) {
    }
    @Post()
    createServer(@Body() ServerDto: CreateServerDto){
        return this.serversService.createServer(ServerDto)
    }
    @Post('addUser')
    async addUser(@Param('serverId') serverId:number,@Param('userId')userId:number){
        return this.serversService.addUser(serverId,userId)
    }
}
