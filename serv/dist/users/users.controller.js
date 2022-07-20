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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const users_entity_1 = require("./users.entity");
const add_user_roles_dto_1 = require("../otherwise/DTOS/add-user_roles.dto");
const roles_auth_decorator_1 = require("../auth/roles-auth.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const add_friend_dto_1 = require("../otherwise/DTOS/add-friend.dto");
const tokens_service_1 = require("../tokens/tokens.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
const create_message_dto_1 = require("../otherwise/DTOS/create-message.dto");
const message_entity_1 = require("../message/message.entity");
const socket_dto_1 = require("../otherwise/DTOS/socket.dto");
const constants_1 = require("../otherwise/helpers/constants");
let UsersController = class UsersController {
    constructor(usersService, tokensService) {
        this.usersService = usersService;
        this.tokensService = tokensService;
    }
    setRole(dto) {
        return this.usersService.addRoleToUser(dto.roleValue, dto.id);
    }
    getAll() {
        return this.usersService.getAllUsers();
    }
    addNewFriend(dto) {
        return this.usersService.addFriend(dto.myId, dto.userId);
    }
    refreshToken(req, res) {
        return this.tokensService.refreshToken(req);
    }
    activateUser(req, res) {
        return this.tokensService.refreshToken(req);
    }
    editAvatar(avatar, req) {
        return this.usersService.uploadAvatar(avatar, req.user.id);
    }
    async getMe(id) {
        let user = await this.usersService.getMeById(id);
        return this.usersService.filterUser(user, constants_1.unnecessaryAttributes);
    }
    async sendMessage(messageDto) {
        return await this.usersService.sendMessages(messageDto);
    }
    async createSocket(socketDto, req) {
        return await this.usersService.createChat(socketDto, req.user.id);
    }
    async updateSocket(dto, req) {
        return await this.usersService.updateChat(dto.socketId, req.user.id);
    }
    async updateStatus(dto, req) {
        return await this.usersService.updateStatus(dto.status, req.user.id);
    }
    async updateLastOpenedChat(chatId, req) {
        return this.usersService.updateOpenedChat(chatId, req.user.id);
    }
    async GetAvatar(id) {
        return this.usersService.getAvatar(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Добавление роли к пользователю" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_entity_1.UsersEntity }),
    (0, roles_auth_decorator_1.Roles)('admin'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/role'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_user_roles_dto_1.AddUserRolesDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "setRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получение всех пользователей" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [users_entity_1.UsersEntity] }),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Добавление в друзья" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_entity_1.UsersEntity }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/friend'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_friend_dto_1.AddFriendDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addNewFriend", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Обновление токена" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: String }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/refreshToken'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "refreshToken", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Активация пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: String }),
    (0, common_1.Post)('/activate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "activateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Активация пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: String }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', {
        storage: (0, multer_1.diskStorage)({
            destination: path.resolve(__dirname, '../../clientFiles/images/avatars'),
            filename: (req, file, cb) => {
                const fileName = (0, uuid_1.v4)() + req['user'].id;
                const extension = path.parse(file.originalname).ext;
                cb(null, `${fileName}${extension}`);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "editAvatar", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получение ваших данных" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [users_entity_1.UsersEntity] }),
    (0, common_1.Get)('me:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Отправка сообщений" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [message_entity_1.MessageEntity] }),
    (0, common_1.Post)('/message'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendMessage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Создание чата" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [users_entity_1.UsersEntity] }),
    (0, common_1.Post)('/socket'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_dto_1.SocketDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createSocket", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Обновление чата" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [users_entity_1.UsersEntity] }),
    (0, common_1.Put)('/updateSocket'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateSocket", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Обновление статуса" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_entity_1.UsersEntity }),
    (0, common_1.Put)('/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Обновление последнего открытого чата" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_entity_1.UsersEntity }),
    (0, common_1.Put)('/lastOpenedChat'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateLastOpenedChat", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получение аватарок" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_entity_1.UsersEntity }),
    (0, common_1.Get)('/avatar:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "GetAvatar", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('Пользователи'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        tokens_service_1.TokensService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map