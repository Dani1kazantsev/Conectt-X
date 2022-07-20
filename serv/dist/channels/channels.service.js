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
exports.ChannelsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const channels_entity_1 = require("./channels.entity");
const servers_service_1 = require("../servers/servers.service");
const files_service_1 = require("../files/files.service");
const fs = require("fs");
const directories_service_1 = require("../directory/directories.service");
let ChannelsService = class ChannelsService {
    constructor(channelsRepository, serversService, filesService, directoriesService) {
        this.channelsRepository = channelsRepository;
        this.serversService = serversService;
        this.filesService = filesService;
        this.directoriesService = directoriesService;
    }
    async saveChannel(channel) {
        return await this.channelsRepository.save(channel);
    }
    async createChannels(channelsDto) {
        const channel = await this.channelsRepository.save(channelsDto);
        channel.server = await this.serversService.findById(channelsDto.serverId);
        await this.channelsRepository.save(channel);
        return await this.channelsRepository.findOne({ where: { id: channel.id }, relations: {
                directories: true
            } });
    }
    async getChannel(id) {
        const channel = await this.channelsRepository.findOne({ where: { id: id } });
        return channel;
    }
    async createFile(dto, userLogin) {
        const channel = await this.channelsRepository.findOne({
            where: { id: dto.channelId }, relations: {
                files: true,
                server: true
            }
        });
        if (!dto.data) {
            dto.data = "";
        }
        let directory = await this.directoriesService.getDirectoryByPath(`./clientFiles/users/${userLogin}/${channel.server.name}${dto.path}`);
        if (channel.files.find(file => file.name == dto.name && file.ext == dto.ext)) {
            throw new common_1.BadRequestException('Есть уже такой файл');
        }
        const file = await this.filesService.createFile(dto, channel, directory);
        channel.files.push(file);
        await this.channelsRepository.save(channel);
        fs.writeFileSync(`./clientFiles/users/${userLogin}/${channel.server.name}/${channel.name}/${dto.name}.${dto.ext}`, dto.data);
        return file;
    }
    async updateFile(dto) {
        try {
            fs.writeFileSync(`${dto.directory.path}/${dto.name}.${dto.ext}`, dto.data);
            return true;
        }
        catch (e) {
            return e;
        }
    }
    async createDirectory(name, channelId, directoryId, path) {
        let channel;
        if (channelId) {
            channel = await this.channelsRepository.findOne({ where: { id: channelId }, relations: {
                    directories: true
                } });
        }
        if (directoryId) {
            const indigenousDirectory = await this.directoriesService.getDirectoryById(directoryId);
            const directory = await this.directoriesService.saveDirectory(name, indigenousDirectory);
            channel.directories.push(directory);
            return directory;
        }
        else if (path) {
            const directory = await this.directoriesService.saveDirectoryWithPath(name, path);
            channel.directories.push(directory);
            return directory;
        }
    }
    async getFileData(fileId) {
        const file = await this.filesService.getFileById(fileId);
        const readedFile = fs.readFileSync(`${file.directory.path}/${file.name}.${file.ext}`, { encoding: 'utf8', flag: 'r' });
        return readedFile;
    }
    async getFileDataByPath(path) {
        const file = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
        return file;
    }
};
ChannelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(channels_entity_1.ChannelsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        servers_service_1.ServersService,
        files_service_1.FilesService,
        directories_service_1.DirectoriesService])
], ChannelsService);
exports.ChannelsService = ChannelsService;
//# sourceMappingURL=channels.service.js.map