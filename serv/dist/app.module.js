"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users/users.entity");
const roles_entity_1 = require("./roles/roles.entity");
const roles_module_1 = require("./roles/roles.module");
const auth_module_1 = require("./auth/auth.module");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const message_module_1 = require("./message/message.module");
const message_entity_1 = require("./message/message.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const MailerConfig_1 = require("./otherwise/configs/MailerConfig");
const servers_module_1 = require("./servers/servers.module");
const channels_module_1 = require("./channels/channels.module");
const channels_entity_1 = require("./channels/channels.entity");
const servers_entity_1 = require("./servers/servers.entity");
const websocket_module_1 = require("./websocket/websocket.module");
const websocket_gateway_1 = require("./websocket/websocket.gateway");
const socket_module_1 = require("./socket/socket.module");
const socket_entity_1 = require("./socket/socket.entity");
const files_module_1 = require("./files/files.module");
const files_entity_1 = require("./files/files.entity");
const directories_module_1 = require("./directory/directories.module");
const directories_entity_1 = require("./directory/directories.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [websocket_gateway_1.WebsocketGateway],
        imports: [mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: MailerConfig_1.MailerConfig
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`
            }), typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.MYSQL_HOST,
                port: Number(process.env.MYSQL_PORT),
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                entities: [users_entity_1.UsersEntity, roles_entity_1.RoleEntity, socket_entity_1.SocketEntity, message_entity_1.MessageEntity, channels_entity_1.ChannelsEntity, servers_entity_1.ServersEntity, files_entity_1.FilesEntity, directories_entity_1.DirectoriesEntity],
                synchronize: true,
            }), graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: true,
                sortSchema: true,
                cors: {
                    origin: process.env.CLIENT_URL,
                    credentials: true
                },
            }), users_module_1.UsersModule, roles_module_1.RolesModule, auth_module_1.AuthModule, message_module_1.MessageModule, servers_module_1.ServersModule, channels_module_1.ChannelsModule, websocket_module_1.WebsocketModule, socket_module_1.SocketModule, files_module_1.FilesModule, directories_module_1.DirectoriesModule]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map