"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
const roles_entity_1 = require("../roles/roles.entity");
const roles_module_1 = require("../roles/roles.module");
const users_resolver_1 = require("./users.resolver");
const message_entity_1 = require("../message/message.entity");
const tokens_module_1 = require("../tokens/tokens.module");
const message_module_1 = require("../message/message.module");
const socket_entity_1 = require("../socket/socket.entity");
const socket_module_1 = require("../socket/socket.module");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        providers: [users_service_1.UsersService, users_resolver_1.UsersResolver],
        controllers: [users_controller_1.UsersController],
        imports: [(0, common_1.forwardRef)(() => tokens_module_1.TokensModule),
            message_module_1.MessageModule, roles_module_1.RolesModule, socket_module_1.SocketModule,
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.UsersEntity, roles_entity_1.RoleEntity, message_entity_1.MessageEntity, socket_entity_1.SocketEntity])
        ], exports: [users_service_1.UsersService]
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map