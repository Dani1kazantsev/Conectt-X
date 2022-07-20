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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const message_service_1 = require("./message.service");
const create_message_dto_1 = require("../otherwise/DTOS/create-message.dto");
const message_entity_1 = require("./message.entity");
const validation_pipe_1 = require("../otherwise/pipes/validation.pipe");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    create(messageDto) {
        return this.messageService.createMessage(messageDto);
    }
    allMessages() {
        return this.messageService.getMessages();
    }
    changeMessage(array) {
        return this.messageService.saveMessages(array);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Отправка сообщений" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: message_entity_1.MessageEntity }),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Все сообщения" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: message_entity_1.MessageEntity }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "allMessages", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Сохранение изменения сообщений" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: message_entity_1.MessageEntity }),
    (0, common_1.Put)('/read'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "changeMessage", null);
MessageController = __decorate([
    (0, swagger_1.ApiTags)('Сообщения'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('message'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map