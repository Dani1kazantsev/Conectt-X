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
exports.ChannelsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const channels_service_1 = require("./channels.service");
const create_channel_dto_1 = require("../otherwise/DTOS/create-channel.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_files_dto_1 = require("../otherwise/DTOS/create-files.dto");
const update_file_dto_1 = require("../otherwise/DTOS/update-file.dto");
const create_directory_dto_1 = require("../otherwise/DTOS/create-directory.dto");
let ChannelsController = class ChannelsController {
    constructor(channelsService) {
        this.channelsService = channelsService;
    }
    createChannel(channelsDto) {
        return this.channelsService.createChannels(channelsDto);
    }
    createFile(req, dto) {
        return this.channelsService.createFile(dto, req['user'].login);
    }
    updateFile(req, dto) {
        return this.channelsService.updateFile(dto);
    }
    getFile(id, channelId) {
        return this.channelsService.getFileData(id);
    }
    getFileByPath(path) {
        return this.channelsService.getFileDataByPath(path.split(',').join('/'));
    }
    createDirectory(req, dto) {
        if (dto.path) {
            return this.channelsService.createDirectory(dto.name, dto.channelId, undefined, dto.path);
        }
        return this.channelsService.createDirectory(dto.name, dto.channelId, dto.directoryId, undefined);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_channel_dto_1.CreateChannelDto]),
    __metadata("design:returntype", void 0)
], ChannelsController.prototype, "createChannel", null);
__decorate([
    (0, common_1.Post)('/createFile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_files_dto_1.CreateFilesDto]),
    __metadata("design:returntype", void 0)
], ChannelsController.prototype, "createFile", null);
__decorate([
    (0, common_1.Put)('/updateFile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_file_dto_1.UpdateFileDto]),
    __metadata("design:returntype", void 0)
], ChannelsController.prototype, "updateFile", null);
__decorate([
    (0, common_1.Get)('/getFileData:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ChannelsController.prototype, "getFile", null);
__decorate([
    (0, common_1.Get)('/getFileDataByPath/:path'),
    __param(0, (0, common_1.Param)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChannelsController.prototype, "getFileByPath", null);
__decorate([
    (0, common_1.Post)('/createDirectory'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_directory_dto_1.CreateDirectoryDto]),
    __metadata("design:returntype", void 0)
], ChannelsController.prototype, "createDirectory", null);
ChannelsController = __decorate([
    (0, swagger_1.ApiTags)('Каналы'),
    (0, common_1.Controller)('channels'),
    __metadata("design:paramtypes", [channels_service_1.ChannelsService])
], ChannelsController);
exports.ChannelsController = ChannelsController;
//# sourceMappingURL=channels.controller.js.map