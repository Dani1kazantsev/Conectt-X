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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_entity_1 = require("./message.entity");
const typeorm_2 = require("typeorm");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let MessageService = class MessageService {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    async createMessage(messageDto) {
        const checkMessage = await this.messageRepository.findOne({ where: { data: messageDto.data, text: messageDto.text, fromUserId: messageDto.fromUserId, toUserId: messageDto.toUserId } });
        if (!checkMessage) {
            const message = await this.messageRepository.save(messageDto);
            return message;
        }
        throw new common_1.BadRequestException('ошибка');
    }
    async getMessages() {
        const messages = await this.messageRepository.find();
        return messages;
    }
    async getUserMessages(userId) {
    }
    async getMessageOfUsers(userId, myId) {
        return await this.messageRepository.find({ where: [{ fromUserId: userId, toUserId: myId }, { fromUserId: myId, toUserId: userId }] });
    }
    async saveMessages(arr) {
        for (let msg of arr) {
            this.messageRepository.save(arr);
        }
        return true;
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.MessageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map