import { UsersEntity } from "../users/users.entity";
import { ChannelsEntity } from "../channels/channels.entity";
import { DirectoriesEntity } from "../directory/directories.entity";
export declare class ServersEntity {
    id: number;
    name: string;
    avatar: string;
    linkToServer?: string;
    type: string;
    channels: ChannelsEntity[];
    users: UsersEntity[];
    directory: DirectoriesEntity;
}
