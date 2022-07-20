import { WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from "../socket/socket.service";
import { MessageEntity } from "../message/message.entity";
import { UsersService } from "../users/users.service";
export declare class WebsocketGateway {
    private socketService;
    private usersService;
    constructor(socketService: SocketService, usersService: UsersService);
    server: Server;
    disconnect(client: Socket): void;
    mess(message: MessageEntity, socket: Socket): Promise<WsResponse<unknown>>;
    addFriend(body: any, socket: Socket): Promise<WsResponse<unknown>>;
}
