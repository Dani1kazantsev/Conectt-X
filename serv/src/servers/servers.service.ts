import {Body, HttpException, HttpStatus, Injectable, Param} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ServersEntity} from "./servers.entity";
import {Repository} from "typeorm";
import {CreateServerDto} from "../otherwise/DTOS/create-server.dto";
import {UsersService} from "../users/users.service";
import {UsersEntity} from "../users/users.entity";
@Injectable()
export class ServersService {
    constructor(@InjectRepository(ServersEntity)
                private serversRepository:Repository<ServersEntity>,
                private userService:UsersService) {
    }
    async findById(id){
        const user = {
            value:'123',
            rest:{

            }
        }
        return await this.serversRepository.findOne({where:{id:id}})
    }
    async createServer(serverDto:CreateServerDto){
        const server = await this.serversRepository.save({...serverDto,linkToServer:`${process.env.API_URL}/servers/addUser:${serverDto.name}`})
        server.linkToServer = `${process.env.API_URL}/servers/addUser`
        return await this.serversRepository.save(server)
    }
    async addUser(serverId:number,userId:number){
        const user:UsersEntity = await this.userService.getUserById(userId)
        const server:ServersEntity = await this.serversRepository.findOne({
            where: {id: serverId},
            relations: {
                users: true
            }
        })
        if(server.users.find(users=>{if(users.id == user.id){
                    return true
        }})){
            throw new HttpException("Есть такой пользователь",HttpStatus.BAD_REQUEST)
        }
        server.users.push(user)
        return this.serversRepository.save(server)
    }

}
