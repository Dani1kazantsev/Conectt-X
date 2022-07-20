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
exports.MessageResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const message_model_1 = require("./message.model");
const message_service_1 = require("./message.service");
const message_input_1 = require("../otherwise/inputs/message.input");
let MessageResolver = class MessageResolver {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async getMessages() {
        return await this.messageService.getMessages();
    }
    async getMessageOfUser(userId) {
        return await this.messageService.getUserMessages(userId);
    }
    async createMessage(messageDto) {
        return await this.messageService.createMessage(messageDto);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [message_model_1.MessageModel]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getMessages", null);
__decorate([
    (0, graphql_1.Query)(() => [message_model_1.MessageModel]),
    __param(0, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getMessageOfUser", null);
__decorate([
    (0, graphql_1.Mutation)(returns => message_model_1.MessageModel),
    __param(0, (0, graphql_1.Args)('messageInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_input_1.MessageInput]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "createMessage", null);
MessageResolver = __decorate([
    (0, graphql_1.Resolver)(() => message_model_1.MessageModel),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageResolver);
exports.MessageResolver = MessageResolver;
//# sourceMappingURL=message.resolver.js.map