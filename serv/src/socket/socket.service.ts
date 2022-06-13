import { Injectable } from '@nestjs/common';
import {SocketEntity} from "./socket.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {SocketDto} from "../otherwise/DTOS/socket.dto";

@Injectable()
export class SocketService {
    constructor(@InjectRepository(SocketEntity) private socketRepository:Repository<SocketEntity>) {
    }
    createSocket(socketDto:SocketDto){
        return this.socketRepository.save(socketDto)
    }
    async findSocket(customId:number){
        return await this.socketRepository.findOne({where:{customId:customId}})
    }
    async updateSocket(socket:SocketEntity){
        return await this.socketRepository.save(socket)
    }
}
