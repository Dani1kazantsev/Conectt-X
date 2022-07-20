import { ChannelsEntity } from "../channels/channels.entity";
import { FilesEntity } from "../files/files.entity";
import { ServersEntity } from "../servers/servers.entity";
import { UsersEntity } from "../users/users.entity";
export declare class DirectoriesEntity {
    id: number;
    name: string;
    path: string;
    channel: ChannelsEntity;
    files: FilesEntity[];
    directories: DirectoriesEntity[];
    directory: DirectoriesEntity;
    servers: ServersEntity[];
    user: UsersEntity;
}
