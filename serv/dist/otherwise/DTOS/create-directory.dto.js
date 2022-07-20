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
exports.CreateDirectoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateDirectoryDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "scripts", description: "Название директории" }),
    __metadata("design:type", String)
], CreateDirectoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "254", description: "Айди канала которому принадлежит директория" }),
    __metadata("design:type", Number)
], CreateDirectoryDto.prototype, "channelId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "251", description: "Айди директории в которой находится папка, если находится" }),
    __metadata("design:type", Number)
], CreateDirectoryDto.prototype, "directoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Путь к папке", description: "Если не принадлежит директории, то путь в которой он расположен будет" }),
    __metadata("design:type", String)
], CreateDirectoryDto.prototype, "path", void 0);
exports.CreateDirectoryDto = CreateDirectoryDto;
//# sourceMappingURL=create-directory.dto.js.map