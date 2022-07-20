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
exports.ChannelsEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const servers_entity_1 = require("../servers/servers.entity");
const files_entity_1 = require("../files/files.entity");
const directories_entity_1 = require("../directory/directories.entity");
let ChannelsEntity = class ChannelsEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Идентификатор канала" }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChannelsEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Редактор кода", description: "Тип канала" }),
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], ChannelsEntity.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Собрание учителей", description: "Название канала" }),
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], ChannelsEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => servers_entity_1.ServersEntity, (server) => server.channels),
    __metadata("design:type", servers_entity_1.ServersEntity)
], ChannelsEntity.prototype, "server", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => files_entity_1.FilesEntity, (files) => files.channel),
    __metadata("design:type", Array)
], ChannelsEntity.prototype, "files", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => directories_entity_1.DirectoriesEntity, (directories) => directories.channel),
    __metadata("design:type", Array)
], ChannelsEntity.prototype, "directories", void 0);
ChannelsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "channels" })
], ChannelsEntity);
exports.ChannelsEntity = ChannelsEntity;
//# sourceMappingURL=channels.entity.js.map