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
exports.RoleEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let RoleEntity = class RoleEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Идентификатор пользователя" }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "user@mail.ru", description: "Уникальная роль пользователя" }),
    (0, typeorm_1.Column)("varchar", { length: 100 }),
    __metadata("design:type", String)
], RoleEntity.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "user", description: "Описание/значение роли пользователя" }),
    (0, typeorm_1.Column)("varchar", { length: 1000 }),
    __metadata("design:type", String)
], RoleEntity.prototype, "description", void 0);
RoleEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "roles"
    })
], RoleEntity);
exports.RoleEntity = RoleEntity;
//# sourceMappingURL=roles.entity.js.map