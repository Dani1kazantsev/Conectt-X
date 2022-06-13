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

@WebSocketGateway(500,{
  cors: {
    origin: '*',
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

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;

  }
  @SubscribeMessage('message')
  async mess(@MessageBody() message: MessageEntity, @ConnectedSocket() socket: Socket): Promise<WsResponse<unknown>>{
    const room = await this.socketService.findSocket(message.toUserId)
    socket.join(room.socketId)
    socket.to(room.socketId).emit('message', {...message,fromServer:true})
    return {event: 'message',data:message}
  }

}