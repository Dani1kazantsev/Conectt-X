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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
const typeorm_2 = require("typeorm");
const roles_service_1 = require("../roles/roles.service");
const fs = require("fs");
const message_service_1 = require("../message/message.service");
const socket_service_1 = require("../socket/socket.service");
const constants_1 = require("../otherwise/helpers/constants");
const path = require("path");
let UsersService = class UsersService {
    constructor(userRepository, rolesService, messageService, socketService) {
        this.userRepository = userRepository;
        this.rolesService = rolesService;
        this.messageService = messageService;
        this.socketService = socketService;
    }
    async createUser(dto) {
        try {
            const user = await this.userRepository.save(dto);
            await this.userRepository.save(user);
            return await this.userRepository.findOne({
                where: {
                    id: user.id
                },
                relations: {
                    directory: true
                }
            });
        }
        catch (e) {
            return e;
        }
    }
    async getAllUsers() {
        const users = await this.userRepository.find({
            relations: [
                "roles", "messages", "friends"
            ]
        });
        return users;
    }
    async addRoleToUser(roleValue, userId) {
        const role = await this.rolesService.findRoleByValue(roleValue);
        let user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["roles"]
        });
        if (user.roles.find(item => item.value === role.value)) {
            return user;
        }
        user.roles.push(role);
        user = await this.userRepository.save(user);
        return user;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email: email },
            relations: ["roles", "messages", "friends"]
        });
        return user;
    }
    async getUserByParams(params) {
        const user = await this.userRepository.findOne({
            where: params,
            relations: ["roles", "messages", "friends"]
        });
        return user;
    }
    async getMeById(id) {
        let myUnnecessaryAttributes = [];
        for (let attr of constants_1.unnecessaryAttributes) {
            myUnnecessaryAttributes.push(attr);
        }
        myUnnecessaryAttributes.push('lastOpenedChat');
        const user = await this.userRepository.findOne({
            where: { id: id },
            relations: ["directory", "friends", "friends.messages", "chat", "servers", "servers.directory",
                "servers.channels", "servers.channels.server", "servers.channels.directories",
                "servers.channels.directories.files", "servers.channels.directories.files.channel",
                "servers.channels.directories.files.directory"]
        });
        for (let friend of user.friends) {
            friend = this.filterUser(friend, myUnnecessaryAttributes);
            friend.messages = await this.messageService.getMessageOfUsers(friend.id, user.id);
        }
        return user;
    }
    async getUserById(id) {
        const user = await this.userRepository.findOne({
            where: { id: id },
            relations: {
                servers: true,
                directory: true
            }
        });
        return user;
    }
    async saveUsers(users) {
        const returnUsers = [];
        for (let i = 0; i < users.length; i++) {
            let user = await this.userRepository.save(users[i]);
            returnUsers.push(user);
        }
        return returnUsers;
    }
    filterUser(user, arrayOfAttributes) {
        for (let i = 0; i < arrayOfAttributes.length; i++) {
            delete user[arrayOfAttributes[i]];
        }
        return user;
    }
    async addFriend(myId, userId) {
        try {
            if (myId == userId) {
                return;
            }
            let user = await this.userRepository.findOne({
                where: { id: myId },
                relations: ["friends", "friends.messages", "messages"]
            });
            const friend = await this.userRepository.findOne({
                where: { id: userId },
                relations: { messages: true, friends: true }
            });
            if (user.friends.length > 0) {
                for (let i = 0; i < user.friends.length; i++) {
                    if (user.friends[i].id == userId) {
                        throw new common_1.BadRequestException('Есть такой друг');
                    }
                }
            }
            friend.friends.push(user);
            await this.userRepository.save(friend);
            delete friend.friends;
            user.friends.push(friend);
            await this.userRepository.save(user);
            return user;
        }
        catch (e) {
            console.log(e);
        }
    }
    async refreshToken() {
    }
    async activateAccount(link) {
        const user = await this.userRepository.findOne({
            where: { activationLink: link }
        });
        if (!user)
            throw new common_1.HttpException('Неправильная ссылка.', common_1.HttpStatus.BAD_REQUEST);
        user.isActivated = true;
        return await this.userRepository.save(user);
    }
    async uploadAvatar(file, myId) {
        const user = await this.userRepository.findOne({ where: { id: myId } });
        fs.unlink(`./clientFiles/images/avatars/${user.avatar}`, function (err) {
            if (err) {
                return err;
            }
        });
        user.avatar = file.filename;
        return await this.userRepository.save(user);
    }
    async sendMessages(messageDto) {
        const message = await this.messageService.createMessage(messageDto);
        const fromUser = await this.userRepository.findOne({
            where: { id: messageDto.fromUserId },
            relations: { messages: true }
        });
        const toUser = await this.userRepository.findOne({
            where: { id: messageDto.toUserId },
            relations: { messages: true }
        });
        fromUser.messages.push(message);
        toUser.messages.push(message);
        await this.saveUsers([fromUser, toUser]);
        return message;
    }
    async createChat(socketDto, myId) {
        const user = await this.userRepository.findOne({ where: { id: myId } });
        const socket = await this.socketService.createSocket(socketDto);
        user.chat = socket;
        return await this.userRepository.save(user);
    }
    async updateChat(socketId, myId) {
        const user = await this.userRepository.findOne({ where: { id: myId }, relations: { chat: true } });
        user.chat.socketId = socketId;
        return await this.socketService.updateSocket(user.chat);
    }
    async updateStatus(status, myId) {
        const user = await this.userRepository.findOne({ where: { id: myId } });
        user.status = status;
        return await this.userRepository.save(user);
    }
    async updateOpenedChat(dto, myId) {
        const user = await this.userRepository.findOne({ where: { id: myId } });
        user.lastOpenedChat = dto.chat;
        return await this.userRepository.save(user);
    }
    async getAvatar(id) {
        let user = await this.userRepository.findOne({ where: { id: id } });
        let avatar = fs.readFileSync(path.resolve(__dirname, '../../clientFiles/images/avatars/') + '/' + user.avatar);
        const mimeType = 'image/jpg';
        return `data:${mimeType};base64,${avatar.toString('base64')}`;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        roles_service_1.RolesService,
        message_service_1.MessageService,
        socket_service_1.SocketService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map