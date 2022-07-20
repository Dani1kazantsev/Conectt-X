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
exports.SocketEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let SocketEntity = class SocketEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Идентификатор пользователя" }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SocketEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "jgkd26-c-4734d", description: "Авто генерируемый айди сокет соединения" }),
    (0, typeorm_1.Column)("varchar", { unique: true }),
    __metadata("design:type", String)
], SocketEntity.prototype, "socketId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "23", description: "Мой айди чата" }),
    (0, typeorm_1.Column)("bigint", { unique: true }),
    __metadata("design:type", Number)
], SocketEntity.prototype, "customId", void 0);
SocketEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "socket"
    })
], SocketEntity);
exports.SocketEntity = SocketEntity;
//# sourceMappingURL=socket.entity.js.map