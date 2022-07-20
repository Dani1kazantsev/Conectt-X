import {BadRequestException, Body, HttpException, HttpStatus, Injectable, Param} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ServersEntity} from "./servers.entity";
import {Repository} from "typeorm";
import {CreateServerDto} from "../otherwise/DTOS/create-server.dto";
import {UsersService} from "../users/users.service";
import {DirectoriesService} from "../directory/directories.service";
import {DirectoriesEntity} from "../directory/directories.entity";

@Injectable()
export class ServersService {
    constructor(@InjectRepository(ServersEntity)
                private serversRepository: Repository<ServersEntity>,
                private usersService: UsersService,
                private directoriesService:DirectoriesService) {
    }

    async findById(id) {
        const user = {
            value: '123',
            rest: {}
        }
        return await this.serversRepository.findOne({where: {id: id}})
    }

    async createServer(serverDto: CreateServerDto) {
        const server = await this.serversRepository.save(serverDto)
        server.linkToServer = `${process.env.API_URL}/users/addUserToServer/${server.id}`
        const directory:DirectoriesEntity = await this.directoriesService.saveDirectory(server.name, serverDto.directory)
        const user = await this.usersService.getUserById(serverDto.userId)
        user.servers.push(server)
        await this.usersService.saveUsers([user])
        return await this.serversRepository.save({...server,directory:directory})
    }

    async addUser(id: number, userId: number) {
        const user = await this.usersService.getUserById(userId)
        const server = await this.serversRepository.findOne({
                where:
                    {
                        id: id
                    },
                relations:{
                    users:true
                }
            }
        )
        server.users.push(user)
        return await this.serversRepository.save(server)
    }
}
