import { Repository } from "typeorm";
import { ChannelsEntity } from "./channels.entity";
import { CreateChannelDto } from "../otherwise/DTOS/create-channel.dto";
import { ServersService } from "../servers/servers.service";
import { CreateFilesDto } from "../otherwise/DTOS/create-files.dto";
import { FilesService } from "../files/files.service";
import { DirectoriesService } from "../directory/directories.service";
import { UpdateFileDto } from "../otherwise/DTOS/update-file.dto";
export declare class ChannelsService {
    private channelsRepository;
    private serversService;
    private filesService;
    private directoriesService;
    constructor(channelsRepository: Repository<ChannelsEntity>, serversService: ServersService, filesService: FilesService, directoriesService: DirectoriesService);
    saveChannel(channel: ChannelsEntity): Promise<ChannelsEntity>;
    createChannels(channelsDto: CreateChannelDto): Promise<ChannelsEntity>;
    getChannel(id: number): Promise<ChannelsEntity>;
    createFile(dto: CreateFilesDto, userLogin: string): Promise<import("../files/files.entity").FilesEntity>;
    updateFile(dto: UpdateFileDto): Promise<any>;
    createDirectory(name: string, channelId: number, directoryId?: number, path?: string): Promise<{
        name: string;
        path: string;
    } & import("../directory/directories.entity").DirectoriesEntity>;
    getFileData(fileId: any): Promise<string>;
    getFileDataByPath(path: any): Promise<string>;
}
