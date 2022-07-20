"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RolesModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const roles_controller_1 = require("./roles.controller");
const roles_service_1 = require("./roles.service");
const roles_entity_1 = require("./roles.entity");
const users_entity_1 = require("../users/users.entity");
let RolesModule = RolesModule_1 = class RolesModule {
};
RolesModule = RolesModule_1 = __decorate([
    (0, common_1.Module)({
        controllers: [roles_controller_1.RolesController],
        providers: [roles_service_1.RolesService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([roles_entity_1.RoleEntity, users_entity_1.UsersEntity])
        ],
        exports: [roles_service_1.RolesService, RolesModule_1]
    })
], RolesModule);
exports.RolesModule = RolesModule;
//# sourceMappingURL=roles.module.js.map