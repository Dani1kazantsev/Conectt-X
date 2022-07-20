import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DirectoriesEntity} from "./directories.entity";
import {Repository} from "typeorm";
import {ChannelsEntity} from "../channels/channels.entity";
import * as fs from "fs";
import {ChannelsService} from "../channels/channels.service";
import {channel} from "diagnostics_channel";

@Injectable()
export class DirectoriesService {
    constructor(@InjectRepository(DirectoriesEntity)
    private directoriesRepository:Repository<DirectoriesEntity>) {
    }
    async getDirectoryByPath(path:string){
        return await this.directoriesRepository.findOne({where:{path:path}})
    }
    async getDirectoryById(id:number){
        return await this.directoriesRepository.findOne({where:{id:id}})
    }
    async saveDirectoryWithPath(name:string,path:string){
        fs.mkdirSync(`${path}/${name}`)
        const directoryEntity =  await this.directoriesRepository.save({name:name,path:`${path}/${name}`})
        return directoryEntity
    }
    async saveDirectory(name:string,directory:DirectoriesEntity,channelId?:number){
        fs.mkdirSync(`${directory.path}/${name}`)
        const directoryEntity =  await this.directoriesRepository.save({name:name,path:`${directory.path}/${name}`})
        return directoryEntity
    }
}
