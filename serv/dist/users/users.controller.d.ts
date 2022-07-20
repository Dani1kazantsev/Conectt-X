/// <reference types="multer" />
import { UsersService } from "./users.service";
import { UsersEntity } from "./users.entity";
import { AddUserRolesDto } from "../otherwise/DTOS/add-user_roles.dto";
import { AddFriendDto } from "../otherwise/DTOS/add-friend.dto";
import { TokensService } from "../tokens/tokens.service";
import { CreateMessageDto } from "../otherwise/DTOS/create-message.dto";
import { MessageEntity } from "../message/message.entity";
import { SocketDto } from "../otherwise/DTOS/socket.dto";
export declare class UsersController {
    private usersService;
    private tokensService;
    constructor(usersService: UsersService, tokensService: TokensService);
    setRole(dto: AddUserRolesDto): Promise<UsersEntity>;
    getAll(): Promise<UsersEntity[]>;
    addNewFriend(dto: AddFriendDto): Promise<UsersEntity>;
    refreshToken(req: any, res: any): Promise<UsersEntity[]>;
    activateUser(req: any, res: any): Promise<UsersEntity[]>;
    editAvatar(avatar: Express.Multer.File, req: any): Promise<UsersEntity>;
    getMe(id: any): Promise<any>;
    sendMessage(messageDto: CreateMessageDto): Promise<CreateMessageDto & MessageEntity>;
    createSocket(socketDto: SocketDto, req: any): Promise<UsersEntity>;
    updateSocket(dto: any, req: any): Promise<import("../socket/socket.entity").SocketEntity>;
    updateStatus(dto: any, req: any): Promise<UsersEntity>;
    updateLastOpenedChat(chatId: any, req: any): Promise<UsersEntity>;
    GetAvatar(id: any): Promise<string>;
}
