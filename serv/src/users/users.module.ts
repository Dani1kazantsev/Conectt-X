import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "./users.entity";
import {RoleEntity} from "../roles/roles.entity";
import {AuthModule} from "../auth/auth.module";
import {RolesModule} from "../roles/roles.module";
import {UsersResolver} from "./users.resolver";
import {MessageEntity} from "../message/message.entity";
import {TokensModule} from "../tokens/tokens.module";
import {MessageModule} from "../message/message.module";
import {SocketEntity} from "../socket/socket.entity";
import {SocketModule} from "../socket/socket.module";

@Module({
    providers: [UsersService, UsersResolver],
    controllers: [UsersController],
    imports: [forwardRef(() => TokensModule),
        forwardRef(() => AuthModule),
        MessageModule, RolesModule,SocketModule,
        TypeOrmModule.forFeature([UsersEntity, RoleEntity, MessageEntity,SocketEntity])
    ], exports: [UsersService]
})
export class UsersModule {
}
