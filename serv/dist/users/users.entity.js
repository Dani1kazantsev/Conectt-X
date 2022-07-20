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
var UsersEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const roles_entity_1 = require("../roles/roles.entity");
const message_entity_1 = require("../message/message.entity");
const servers_entity_1 = require("../servers/servers.entity");
const socket_entity_1 = require("../socket/socket.entity");
const directories_entity_1 = require("../directory/directories.entity");
let UsersEntity = UsersEntity_1 = class UsersEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Идентификатор пользователя" }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UsersEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "user", description: "Логин пользователя" }),
    (0, typeorm_1.Column)("varchar", { unique: true, length: 100 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "login", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "user@mail.ru", description: "Почта пользователя" }),
    (0, typeorm_1.Column)("varchar", { unique: true, length: 100, default: 'src/img/manifest/messenger/user1.png' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "server/avatars/user-avatar.jpg", description: "Аватарка" }),
    (0, typeorm_1.Column)("varchar", { default: 'user.png' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "userkrutoi_2", description: "Пароль пользователя" }),
    (0, typeorm_1.Column)("varchar", { length: 100 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Саша", description: "Имя пользователя" }),
    (0, typeorm_1.Column)("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Казанцев", description: "Фамилия пользователя" }),
    (0, typeorm_1.Column)("varchar", { length: 100, nullable: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "false", description: "Активирован ли пользователь" }),
    (0, typeorm_1.Column)("boolean", { default: false }),
    __metadata("design:type", Boolean)
], UsersEntity.prototype, "isActivated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "iask5-12as-kg-sk4-ddsds", description: "Ссылка на активацию" }),
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "activationLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1s2s3zx-5-2kgd-asdas3-f2", description: "Рефреш токен" }),
    (0, typeorm_1.Column)("varchar", { nullable: true, length: 300 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Я начинающий разработчик,привет", description: "Статус пользователя" }),
    (0, typeorm_1.Column)("varchar", { default: '', nullable: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "24", description: "Айди пользователя, с которым был открыт чат в последний раз" }),
    (0, typeorm_1.Column)("bigint", { default: -1 }),
    __metadata("design:type", Number)
], UsersEntity.prototype, "lastOpenedChat", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => roles_entity_1.RoleEntity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], UsersEntity.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => message_entity_1.MessageEntity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], UsersEntity.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => UsersEntity_1),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], UsersEntity.prototype, "friends", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => servers_entity_1.ServersEntity, (servers) => servers.users),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], UsersEntity.prototype, "servers", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => socket_entity_1.SocketEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", socket_entity_1.SocketEntity)
], UsersEntity.prototype, "chat", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => directories_entity_1.DirectoriesEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", directories_entity_1.DirectoriesEntity)
], UsersEntity.prototype, "directory", void 0);
UsersEntity = UsersEntity_1 = __decorate([
    (0, typeorm_1.Entity)({
        name: "users"
    })
], UsersEntity);
exports.UsersEntity = UsersEntity;
//# sourceMappingURL=users.entity.js.map