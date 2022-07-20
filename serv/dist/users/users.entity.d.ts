import { RoleEntity } from "../roles/roles.entity";
import { MessageEntity } from "../message/message.entity";
import { ServersEntity } from "../servers/servers.entity";
import { SocketEntity } from "../socket/socket.entity";
import { DirectoriesEntity } from "../directory/directories.entity";
export declare class UsersEntity {
    id: number;
    login: string;
    email: string;
    avatar: string;
    password: string;
    firstName: string;
    lastName: string;
    isActivated: boolean;
    activationLink: string;
    refreshToken: string;
    status: string;
    lastOpenedChat: number;
    roles: RoleEntity[];
    messages: Array<MessageEntity>;
    friends: UsersEntity[];
    servers: ServersEntity[];
    chat: SocketEntity;
    directory: DirectoriesEntity;
}
