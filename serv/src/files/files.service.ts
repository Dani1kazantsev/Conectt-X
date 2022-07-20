import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FilesEntity} from "./files.entity";
import {CreateFilesDto} from "../otherwise/DTOS/create-files.dto";
import {Repository} from "typeorm";
import {ChannelsEntity} from "../channels/channels.entity";
import {DirectoriesEntity} from "../directory/directories.entity";

@Injectable()
export class FilesService {
    constructor(@InjectRepository(FilesEntity)
                private filesRepository: Repository<FilesEntity>,) {
    }

    async createFile(filesDto: CreateFilesDto, channel: ChannelsEntity,directory?:DirectoriesEntity) {
        const file: FilesEntity = await this.filesRepository.save({...filesDto, channel: channel,directory:directory})
        return await this.filesRepository.findOneBy({id: file.id})
    }

    async getFileById(fileId: number): Promise<FilesEntity> {

        return await this.filesRepository.findOne({
            where: {id: fileId}, relations: {
                channel: true, directory: true
            }
        })
    }
}
