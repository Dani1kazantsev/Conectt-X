import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {getRepository, Repository} from "typeorm";
import {ChannelsEntity} from "./channels.entity";
import {CreateChannelDto} from "../otherwise/DTOS/create-channel.dto";
import {ServersService} from "../servers/servers.service";
import {CreateFilesDto} from "../otherwise/DTOS/create-files.dto";
import {FilesService} from "../files/files.service";
import * as fs from "fs";
import {DirectoriesService} from "../directory/directories.service";
import {UpdateFileDto} from "../otherwise/DTOS/update-file.dto";
import {read} from "fs";

@Injectable()
export class ChannelsService {
    constructor(@InjectRepository(ChannelsEntity)
                private channelsRepository: Repository<ChannelsEntity>,
                private serversService: ServersService,
                private filesService: FilesService,
                private directoriesService: DirectoriesService) {
    }
    async saveChannel(channel:ChannelsEntity){
        return await this.channelsRepository.save(channel)
    }
    async createChannels(channelsDto: CreateChannelDto) {
        const channel = await this.channelsRepository.save(channelsDto)
        channel.server = await this.serversService.findById(channelsDto.serverId)
        await this.channelsRepository.save(channel)
        return await this.channelsRepository.findOne({where:{id:channel.id},relations:{
            directories:true
            }})
    }

    async getChannel(id: number) {
        const channel = await this.channelsRepository.findOne({where: {id: id}})
        return channel
    }

    async createFile(dto: CreateFilesDto, userLogin: string) {
        const channel = await this.channelsRepository.findOne({
            where: {id: dto.channelId}, relations: {
                files: true,
                server:true
            }
        })
        if(!dto.data){
            dto.data = ""
        }
        let directory =  await this.directoriesService.getDirectoryByPath(`./clientFiles/users/${userLogin}/${channel.server.name}${dto.path}`)
        if(channel.files.find(file => file.name == dto.name && file.ext == dto.ext)){
            throw new BadRequestException('Есть уже такой файл')
        }
        const file = await this.filesService.createFile(dto, channel,directory)
        channel.files.push(file)
        await this.channelsRepository.save(channel)
        fs.writeFileSync(`./clientFiles/users/${userLogin}/${channel.server.name}/${channel.name}/${dto.name}.${dto.ext}`, dto.data)
        return file

    }

    async updateFile(dto:UpdateFileDto) {
        try {
            fs.writeFileSync(`${dto.directory.path}/${dto.name}.${dto.ext}`, dto.data)
            return true
        } catch (e) {
            return e
        }
    }
    async createDirectory(name:string,channelId:number,directoryId?:number,path?:string){
        let channel;
        if(channelId){
            channel = await this.channelsRepository.findOne({where:{id:channelId},relations:{
                directories:true
                }})
        }
        if(directoryId){
            const indigenousDirectory = await this.directoriesService.getDirectoryById(directoryId)
            const directory = await this.directoriesService.saveDirectory(name,indigenousDirectory)
            channel.directories.push(directory)
            return directory
        }else if(path){
            const directory =  await this.directoriesService.saveDirectoryWithPath(name,path)
            channel.directories.push(directory)
            return directory
        }
    }
    async getFileData(fileId){
        const file = await this.filesService.getFileById(fileId)
        const readedFile = fs.readFileSync(`${file.directory.path}/${file.name}.${file.ext}`,
            {encoding:'utf8', flag:'r'})
        return readedFile
    }

    async getFileDataByPath(path){
        const file = fs.readFileSync(path,
            {encoding:'utf8', flag:'r'})
        return file
    }
}
