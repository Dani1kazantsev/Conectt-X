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
exports.MessageEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let MessageEntity = class MessageEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "10", description: "Идентификатор сообщения" }),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", Number)
], MessageEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Идентификатор от кого пришло сообщение" }),
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], MessageEntity.prototype, "fromUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "3", description: "Идентификатор кому пришло сообщение" }),
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], MessageEntity.prototype, "toUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Привет.", description: "Текст сообщения" }),
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], MessageEntity.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "12.02.03", description: "Время сообщения" }),
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], MessageEntity.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Прочитано //true", description: "Прочитано или нет" }),
    (0, typeorm_1.Column)("boolean", { default: false }),
    __metadata("design:type", Boolean)
], MessageEntity.prototype, "readed", void 0);
MessageEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "message"
    })
], MessageEntity);
exports.MessageEntity = MessageEntity;
//# sourceMappingURL=message.entity.js.map