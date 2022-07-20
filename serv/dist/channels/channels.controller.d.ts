import { ChannelsService } from "./channels.service";
import { CreateChannelDto } from "../otherwise/DTOS/create-channel.dto";
import { CreateFilesDto } from "../otherwise/DTOS/create-files.dto";
import { UpdateFileDto } from "../otherwise/DTOS/update-file.dto";
import { CreateDirectoryDto } from "../otherwise/DTOS/create-directory.dto";
export declare class ChannelsController {
    private channelsService;
    constructor(channelsService: ChannelsService);
    createChannel(channelsDto: CreateChannelDto): Promise<import("./channels.entity").ChannelsEntity>;
    createFile(req: any, dto: CreateFilesDto): Promise<import("../files/files.entity").FilesEntity>;
    updateFile(req: any, dto: UpdateFileDto): Promise<any>;
    getFile(id: number, channelId: number): Promise<string>;
    getFileByPath(path: string): Promise<string>;
    createDirectory(req: any, dto: CreateDirectoryDto): Promise<{
        name: string;
        path: string;
    } & import("../directory/directories.entity").DirectoriesEntity>;
}
