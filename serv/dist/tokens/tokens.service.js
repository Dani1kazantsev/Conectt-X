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
exports.TokensService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let TokensService = class TokensService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    generateToken(user) {
        const payload = { login: user.login, email: user.email, id: user.id };
        return {
            accessToken: this.jwtService.sign(payload, {
                expiresIn: '1d',
                secret: process.env.JWT_ACCESS_SECRET
            }),
            refreshToken: this.jwtService.sign(payload, {
                expiresIn: '30d',
                secret: process.env.JWT_REFRESH_SECRET
            })
        };
    }
    async validateRefreshToken(token) {
        try {
            const userData = this.jwtService.verify(token, { secret: process.env.JWT_REFRESH_SECRET });
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    async validateAccessToken(token) {
        try {
            const userData = this.jwtService.verify(token, { secret: process.env.JWT_ACCESS_SECRET });
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    async refreshToken(refreshToken) {
        const user = await this.userService.getUserByParams([{ refreshToken: refreshToken }]);
        if (user) {
        }
        return await this.userService.saveUsers([user]);
    }
};
TokensService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService])
], TokensService);
exports.TokensService = TokensService;
//# sourceMappingURL=tokens.service.js.map