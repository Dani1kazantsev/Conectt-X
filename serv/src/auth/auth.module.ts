import {forwardRef, Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {AuthResolver} from "./auth.resolver";
import {MailModule} from "../mail/mail.module";
import {TokensModule} from "../tokens/tokens.module";
import {MessageModule} from "../message/message.module";
import {ServersModule} from "../servers/servers.module";
import {ChannelsModule} from "../channels/channels.module";
import {DirectoriesModule} from "../directory/directories.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService, AuthResolver],
    imports: [MailModule, TokensModule, MessageModule, ServersModule, ChannelsModule, UsersModule, DirectoriesModule],
    exports: [
        AuthService
    ]
})
export class AuthModule {
}
