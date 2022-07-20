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
var DirectoriesEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoriesEntity = void 0;
const typeorm_1 = require("typeorm");
const channels_entity_1 = require("../channels/channels.entity");
const files_entity_1 = require("../files/files.entity");
const servers_entity_1 = require("../servers/servers.entity");
const users_entity_1 = require("../users/users.entity");
let DirectoriesEntity = DirectoriesEntity_1 = class DirectoriesEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", Number)
], DirectoriesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], DirectoriesEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], DirectoriesEntity.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => channels_entity_1.ChannelsEntity, (channel) => channel.directories),
    __metadata("design:type", channels_entity_1.ChannelsEntity)
], DirectoriesEntity.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => files_entity_1.FilesEntity, (files) => files.directory),
    __metadata("design:type", Array)
], DirectoriesEntity.prototype, "files", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DirectoriesEntity_1, (directories) => directories.directory),
    __metadata("design:type", Array)
], DirectoriesEntity.prototype, "directories", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DirectoriesEntity_1, (directory) => directory.directories),
    __metadata("design:type", DirectoriesEntity)
], DirectoriesEntity.prototype, "directory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => servers_entity_1.ServersEntity, (servers) => servers.directory),
    __metadata("design:type", Array)
], DirectoriesEntity.prototype, "servers", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => users_entity_1.UsersEntity),
    __metadata("design:type", users_entity_1.UsersEntity)
], DirectoriesEntity.prototype, "user", void 0);
DirectoriesEntity = DirectoriesEntity_1 = __decorate([
    (0, typeorm_1.Entity)({
        name: "directories"
    })
], DirectoriesEntity);
exports.DirectoriesEntity = DirectoriesEntity;
//# sourceMappingURL=directories.entity.js.map