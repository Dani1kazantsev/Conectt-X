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
exports.UpdateFileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const directories_entity_1 = require("../../directory/directories.entity");
class UpdateFileDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "script", description: "Название файла" }),
    __metadata("design:type", String)
], UpdateFileDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "js", description: "Расширение файла" }),
    __metadata("design:type", String)
], UpdateFileDto.prototype, "ext", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "function script(){console.log('that's work')}", description: "Код внутри файла" }),
    __metadata("design:type", String)
], UpdateFileDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: directories_entity_1.DirectoriesEntity, description: "Директория файла" }),
    __metadata("design:type", directories_entity_1.DirectoriesEntity)
], UpdateFileDto.prototype, "directory", void 0);
exports.UpdateFileDto = UpdateFileDto;
//# sourceMappingURL=update-file.dto.js.map