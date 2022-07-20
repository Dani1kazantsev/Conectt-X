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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const directories_entity_1 = require("./directories.entity");
const typeorm_2 = require("typeorm");
const fs = require("fs");
let DirectoriesService = class DirectoriesService {
    constructor(directoriesRepository) {
        this.directoriesRepository = directoriesRepository;
    }
    async getDirectoryByPath(path) {
        return await this.directoriesRepository.findOne({ where: { path: path } });
    }
    async getDirectoryById(id) {
        return await this.directoriesRepository.findOne({ where: { id: id } });
    }
    async saveDirectoryWithPath(name, path) {
        fs.mkdirSync(`${path}/${name}`);
        const directoryEntity = await this.directoriesRepository.save({ name: name, path: `${path}/${name}` });
        return directoryEntity;
    }
    async saveDirectory(name, directory, channelId) {
        fs.mkdirSync(`${directory.path}/${name}`);
        const directoryEntity = await this.directoriesRepository.save({ name: name, path: `${directory.path}/${name}` });
        return directoryEntity;
    }
};
DirectoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(directories_entity_1.DirectoriesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DirectoriesService);
exports.DirectoriesService = DirectoriesService;
//# sourceMappingURL=directories.service.js.map