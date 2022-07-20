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
exports.CreateFilesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateFilesDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "script", description: "Название файла" }),
    __metadata("design:type", String)
], CreateFilesDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "js", description: "Расширение файла" }),
    __metadata("design:type", String)
], CreateFilesDto.prototype, "ext", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Канал редактор кода", description: "К какому каналу присоединен" }),
    __metadata("design:type", Number)
], CreateFilesDto.prototype, "channelId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "for(let i = 0; i < 10; i++){}", description: "Внутренние данные файла" }),
    __metadata("design:type", String)
], CreateFilesDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "/scripts", description: "В какой директории находится файл" }),
    __metadata("design:type", String)
], CreateFilesDto.prototype, "path", void 0);
exports.CreateFilesDto = CreateFilesDto;
//# sourceMappingURL=create-files.dto.js.map