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
exports.FilesEntity = void 0;
const typeorm_1 = require("typeorm");
const channels_entity_1 = require("../channels/channels.entity");
const directories_entity_1 = require("../directory/directories.entity");
let FilesEntity = class FilesEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FilesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], FilesEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], FilesEntity.prototype, "ext", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => channels_entity_1.ChannelsEntity, (channel) => channel.files),
    __metadata("design:type", channels_entity_1.ChannelsEntity)
], FilesEntity.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => directories_entity_1.DirectoriesEntity, (directory) => directory.files),
    __metadata("design:type", directories_entity_1.DirectoriesEntity)
], FilesEntity.prototype, "directory", void 0);
FilesEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "files"
    })
], FilesEntity);
exports.FilesEntity = FilesEntity;
//# sourceMappingURL=files.entity.js.map