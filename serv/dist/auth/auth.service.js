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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
const mail_service_1 = require("../mail/mail.service");
const tokens_service_1 = require("../tokens/tokens.service");
const message_service_1 = require("../message/message.service");
const constants_1 = require("../otherwise/helpers/constants");
const servers_service_1 = require("../servers/servers.service");
const channels_service_1 = require("../channels/channels.service");
const directories_service_1 = require("../directory/directories.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, mailService, tokensService, messageService, serversService, channelsService, directoriesService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.tokensService = tokensService;
        this.messageService = messageService;
        this.serversService = serversService;
        this.channelsService = channelsService;
        this.directoriesService = directoriesService;
    }
    async login(userDto) {
        const user = await this.validateUser(userDto);
        for (let friend of user.friends) {
            friend = this.userService.filterUser(friend, constants_1.unnecessaryAttributes);
            friend.messages = await this.messageService.getMessageOfUsers(friend.id, user.id);
        }
        let tokens = this.tokensService.generateToken(user);
        user.refreshToken = tokens.refreshToken;
        this.userService.saveUsers([user]);
        return tokens;
    }
    async registration(userDto) {
        try {
            const candidateUser = await this.userService.getUserByParams([{ email: userDto.email }, { login: userDto.login }]);
            if (candidateUser) {
                throw new common_1.BadRequestException("Пользователь с таким email или login уже есть.");
            }
            const hashPassword = await bcrypt.hash(userDto.password, 4);
            const activateLink = (0, uuid_1.v4)();
            const user = await this.userService.createUser(Object.assign(Object.assign({}, userDto), { password: hashPassword, activationLink: activateLink }));
            await this.mailService.sendMail(userDto.email, activateLink, userDto.login);
            const tokens = this.tokensService.generateToken(user);
            user.refreshToken = tokens.refreshToken;
            const userDirectory = await this.directoriesService.saveDirectoryWithPath(user.login, `./clientFiles/users`);
            user.directory = userDirectory;
            const server = await this.serversService.createServer({
                name: "myServer",
                type: "editor",
                directory: userDirectory,
                userId: user.id
            });
            await this.userService.saveUsers([user]);
            const channel = await this.channelsService.createChannels({
                serverId: server.id,
                type: "editor",
                name: "myServerEditor"
            });
            const channelDirectory = await this.directoriesService.saveDirectory(channel.name, server.directory, channel.id);
            channel.directories.push(channelDirectory);
            await this.channelsService.saveChannel(channel);
            return tokens;
        }
        catch (e) {
            return e;
        }
    }
    async validateUser(userDto) {
        let passwordEqualsCheck;
        const user = await this.userService.getUserByEmail(userDto.email);
        if (user) {
            passwordEqualsCheck = await bcrypt.compare(userDto.password, user.password);
            if (passwordEqualsCheck) {
                return user;
            }
        }
        throw new common_1.UnauthorizedException({ message: "Неправильный email или пароль" });
    }
    async activate(link) {
        const user = await this.userService.getUserByParams([{ activationLink: link }]);
        if (user) {
            user.isActivated = true;
            return await this.userService.saveUsers([user]);
        }
        throw new Error('Неправильная ссылка');
    }
    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Не авторизован');
        }
        const userData = await this.tokensService.validateRefreshToken(refreshToken);
        if (!userData) {
            throw new common_1.UnauthorizedException('Не авторизован');
        }
        const user = await this.userService.getUserById(userData.id);
        if (user.refreshToken != userData.refreshToken || !userData || !user) {
            throw new common_1.UnauthorizedException('Не авторизован');
        }
        const tokens = this.tokensService.generateToken(user);
        user.refreshToken = tokens.refreshToken;
        this.userService.saveUsers([user]);
        return tokens;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mail_service_1.MailService,
        tokens_service_1.TokensService,
        message_service_1.MessageService,
        servers_service_1.ServersService,
        channels_service_1.ChannelsService,
        directories_service_1.DirectoriesService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map