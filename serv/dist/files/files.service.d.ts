import { FilesEntity } from "./files.entity";
import { CreateFilesDto } from "../otherwise/DTOS/create-files.dto";
import { Repository } from "typeorm";
import { ChannelsEntity } from "../channels/channels.entity";
import { DirectoriesEntity } from "../directory/directories.entity";
export declare class FilesService {
    private filesRepository;
    constructor(filesRepository: Repository<FilesEntity>);
    createFile(filesDto: CreateFilesDto, channel: ChannelsEntity, directory?: DirectoriesEntity): Promise<FilesEntity>;
    getFileById(fileId: number): Promise<FilesEntity>;
}
