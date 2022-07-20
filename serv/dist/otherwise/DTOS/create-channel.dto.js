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
exports.CreateChannelDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateChannelDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "134874", description: "Идентификатор сервера к которому он принадлежит" }),
    __metadata("design:type", Number)
], CreateChannelDto.prototype, "serverId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Голосовой", description: "Тип канала" }),
    __metadata("design:type", String)
], CreateChannelDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Kodland channel", description: "Название канала" }),
    __metadata("design:type", String)
], CreateChannelDto.prototype, "name", void 0);
exports.CreateChannelDto = CreateChannelDto;
//# sourceMappingURL=create-channel.dto.js.map