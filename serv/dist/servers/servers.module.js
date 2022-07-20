"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServersModule = void 0;
const common_1 = require("@nestjs/common");
const servers_service_1 = require("./servers.service");
const servers_controller_1 = require("./servers.controller");
const typeorm_1 = require("@nestjs/typeorm");
const servers_entity_1 = require("./servers.entity");
const users_module_1 = require("../users/users.module");
const jwt_1 = require("@nestjs/jwt");
const directories_module_1 = require("../directory/directories.module");
let ServersModule = class ServersModule {
};
ServersModule = __decorate([
    (0, common_1.Module)({
        providers: [servers_service_1.ServersService],
        controllers: [servers_controller_1.ServersController],
        imports: [typeorm_1.TypeOrmModule.forFeature([servers_entity_1.ServersEntity]), users_module_1.UsersModule, jwt_1.JwtModule, directories_module_1.DirectoriesModule],
        exports: [servers_service_1.ServersService]
    })
], ServersModule);
exports.ServersModule = ServersModule;
//# sourceMappingURL=servers.module.js.map