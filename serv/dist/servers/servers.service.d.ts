import { ServersEntity } from "./servers.entity";
import { Repository } from "typeorm";
import { CreateServerDto } from "../otherwise/DTOS/create-server.dto";
import { UsersService } from "../users/users.service";
import { DirectoriesService } from "../directory/directories.service";
import { DirectoriesEntity } from "../directory/directories.entity";
export declare class ServersService {
    private serversRepository;
    private usersService;
    private directoriesService;
    constructor(serversRepository: Repository<ServersEntity>, usersService: UsersService, directoriesService: DirectoriesService);
    findById(id: any): Promise<ServersEntity>;
    createServer(serverDto: CreateServerDto): Promise<{
        directory: DirectoriesEntity;
        linkToServer?: string;
        avatar: string;
        name: string;
        type: string;
        userId: number;
        id: number;
        channels: import("../channels/channels.entity").ChannelsEntity[];
        users: import("../users/users.entity").UsersEntity[];
    } & ServersEntity>;
    addUser(id: number, userId: number): Promise<ServersEntity>;
}
