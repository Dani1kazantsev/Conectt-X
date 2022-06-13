import {Module} from "@nestjs/common";
import {UsersModule} from './users/users.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "./users/users.entity";
import {RoleEntity} from "./roles/roles.entity";
import {RolesModule} from "./roles/roles.module";
import {AuthModule} from "./auth/auth.module";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo"
import {MessageModule} from './message/message.module';
import {MessageEntity} from "./message/message.entity";
import {MailerModule} from "@nestjs-modules/mailer";
import {MailerConfig} from "./otherwise/configs/MailerConfig";
import {ServersModule} from './servers/servers.module';
import {ChannelsModule} from './channels/channels.module';
import {ChannelsEntity} from "./channels/channels.entity";
import {ServersEntity} from "./servers/servers.entity";
import {WebsocketModule} from './websocket/websocket.module';
import {WebsocketGateway} from './websocket/websocket.gateway';
import { SocketModule } from './socket/socket.module';
import {SocketEntity} from "./socket/socket.entity";

@Module({
    controllers: [],
    providers: [WebsocketGateway],
    imports: [MailerModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: MailerConfig
    })
        , ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }), TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: [UsersEntity, RoleEntity,SocketEntity, MessageEntity, ChannelsEntity, ServersEntity],
            synchronize: true,
        }), GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            sortSchema: true,
            cors: {
                origin: true,
                credentials: true
            },

        }), UsersModule, RolesModule, AuthModule, MessageModule, ServersModule, ChannelsModule, WebsocketModule, SocketModule]
})
export class AppModule {
}