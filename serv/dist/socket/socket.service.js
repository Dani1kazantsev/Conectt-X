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
exports.SocketService = void 0;
const common_1 = require("@nestjs/common");
const socket_entity_1 = require("./socket.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let SocketService = class SocketService {
    constructor(socketRepository) {
        this.socketRepository = socketRepository;
    }
    createSocket(socketDto) {
        return this.socketRepository.save(socketDto);
    }
    async findSocket(customId) {
        return await this.socketRepository.findOne({ where: { customId: customId } });
    }
    async updateSocket(socket) {
        return await this.socketRepository.save(socket);
    }
};
SocketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(socket_entity_1.SocketEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SocketService);
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map