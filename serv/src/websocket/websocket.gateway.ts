import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, WsResponse,

} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {SocketService} from "../socket/socket.service";
import {MessageEntity} from "../message/message.entity";
import {UsersService} from "../users/users.service";

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:63342'],
  },
})
export class WebsocketGateway {
  constructor(private socketService:SocketService,
              private usersService:UsersService) {
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('closeSocket')
  disconnect(client: Socket){
    client.disconnect()
  }
  @SubscribeMessage('message')
  async mess(@MessageBody() message: MessageEntity, @ConnectedSocket() socket: Socket): Promise<WsResponse<unknown>>{
    const room = await this.socketService.findSocket(message.toUserId)
    socket.to(room.socketId).emit('message', {...message,fromServer:true})
    return {event: 'message',data:message}
  }

  @SubscribeMessage('friendAdd')
  async addFriend(@MessageBody() body, @ConnectedSocket() socket: Socket): Promise<WsResponse<unknown>>{
    const room = await this.socketService.findSocket(body.friendId)
    socket.to(room.socketId).emit('friendAdd',{fromServer:true})
    return
  }
}