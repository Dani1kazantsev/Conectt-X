"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const users_module_1 = require("../users/users.module");
const auth_resolver_1 = require("./auth.resolver");
const mail_module_1 = require("../mail/mail.module");
const tokens_module_1 = require("../tokens/tokens.module");
const message_module_1 = require("../message/message.module");
const servers_module_1 = require("../servers/servers.module");
const channels_module_1 = require("../channels/channels.module");
const directories_module_1 = require("../directory/directories.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, auth_resolver_1.AuthResolver],
        imports: [mail_module_1.MailModule, tokens_module_1.TokensModule, message_module_1.MessageModule, servers_module_1.ServersModule, channels_module_1.ChannelsModule, users_module_1.UsersModule, directories_module_1.DirectoriesModule],
        exports: [
            auth_service_1.AuthService
        ]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map