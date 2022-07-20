"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServersEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const users_entity_1 = require("../users/users.entity");
const channels_entity_1 = require("../channels/channels.entity");
const directories_entity_1 = require("../directory/directories.entity");
let ServersEntity = class ServersEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Идентификатор сервера" }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ServersEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "user", description: "Название сервера" }),
    (0, typeorm_1.Column)("varchar", { length: 100 }),
    __metadata("design:type", String)
], ServersEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "server/avatars/server-avatar.jpg", description: "Аватарка" }),
    (0, typeorm_1.Column)("varchar", { default: "servers.png" }),
    __metadata("design:type", String)
], ServersEntity.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Саша", description: "Имя пользователя" }),
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", String)
], ServersEntity.prototype, "linkToServer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Редактор кода", description: "Тип сервера" }),
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], ServersEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => channels_entity_1.ChannelsEntity, (channels) => channels.server),
    __metadata("design:type", Array)
], ServersEntity.prototype, "channels", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => users_entity_1.UsersEntity, (user) => user.servers),
    __metadata("design:type", Array)
], ServersEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => directories_entity_1.DirectoriesEntity, (directory) => directory.servers),
    __metadata("design:type", directories_entity_1.DirectoriesEntity)
], ServersEntity.prototype, "directory", void 0);
ServersEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "servers" })
], ServersEntity);
exports.ServersEntity = ServersEntity;
//# sourceMappingURL=servers.entity.js.map