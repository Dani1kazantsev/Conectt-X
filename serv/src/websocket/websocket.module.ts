import {Module} from '@nestjs/common';
import {WebsocketGateway} from "./websocket.gateway";
import {SocketModule} from "../socket/socket.module";
import {UsersModule} from "../users/users.module";

@Module({
    providers: [WebsocketGateway],
    imports: [SocketModule,UsersModule]
})
export class WebsocketModule {
}
