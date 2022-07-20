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
exports.CreateServerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const directories_entity_1 = require("../../directory/directories.entity");
class CreateServerDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "conectt-x.ru/serverName:aa2", description: "Ссылка на сервер" }),
    __metadata("design:type", String)
], CreateServerDto.prototype, "linkToServer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "server/avatars/server-avatar.jpg", description: "Аватарка" }),
    __metadata("design:type", String)
], CreateServerDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Kodland server", description: "Название сервера" }),
    __metadata("design:type", String)
], CreateServerDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "editor", description: "Тип сервера" }),
    __metadata("design:type", String)
], CreateServerDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "testUser", description: "Директория в которой находится сервер" }),
    __metadata("design:type", directories_entity_1.DirectoriesEntity)
], CreateServerDto.prototype, "directory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "123", description: "Айди пользователя кому принадлежит сервер" }),
    __metadata("design:type", Number)
], CreateServerDto.prototype, "userId", void 0);
exports.CreateServerDto = CreateServerDto;
//# sourceMappingURL=create-server.dto.js.map