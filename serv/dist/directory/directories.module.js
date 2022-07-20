"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoriesModule = void 0;
const common_1 = require("@nestjs/common");
const directories_service_1 = require("./directories.service");
const typeorm_1 = require("@nestjs/typeorm");
const directories_entity_1 = require("./directories.entity");
let DirectoriesModule = class DirectoriesModule {
};
DirectoriesModule = __decorate([
    (0, common_1.Module)({
        providers: [directories_service_1.DirectoriesService],
        imports: [typeorm_1.TypeOrmModule.forFeature([directories_entity_1.DirectoriesEntity])],
        exports: [directories_service_1.DirectoriesService]
    })
], DirectoriesModule);
exports.DirectoriesModule = DirectoriesModule;
//# sourceMappingURL=directories.module.js.map