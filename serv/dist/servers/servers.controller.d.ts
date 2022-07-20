/// <reference types="multer" />
import { ServersService } from "./servers.service";
import { CreateServerDto } from "../otherwise/DTOS/create-server.dto";
export declare class ServersController {
    private serversService;
    constructor(serversService: ServersService);
    createServer(ServerDto: CreateServerDto): Promise<{
        directory: import("../directory/directories.entity").DirectoriesEntity;
        linkToServer?: string;
        avatar: string;
        name: string;
        type: string;
        userId: number;
        id: number;
        channels: import("../channels/channels.entity").ChannelsEntity[];
        users: import("../users/users.entity").UsersEntity[];
    } & import("./servers.entity").ServersEntity>;
    addUser(id: number, req: any): Promise<import("./servers.entity").ServersEntity>;
    editAvatar(avatar: Express.Multer.File, req: any): void;
}
