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
exports.AddUserRolesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AddUserRolesDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Идентификатор пользователя" }),
    __metadata("design:type", Number)
], AddUserRolesDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Админ", description: "Название роли" }),
    __metadata("design:type", String)
], AddUserRolesDto.prototype, "roleValue", void 0);
exports.AddUserRolesDto = AddUserRolesDto;
//# sourceMappingURL=add-user_roles.dto.js.map