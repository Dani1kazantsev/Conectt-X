"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensModule = void 0;
const common_1 = require("@nestjs/common");
const tokens_service_1 = require("../tokens/tokens.service");
const jwt_1 = require("@nestjs/jwt");
const users_module_1 = require("../users/users.module");
let TokensModule = class TokensModule {
};
TokensModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [tokens_service_1.TokensService],
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.PRIVATE_KEY || 'SECRET',
                signOptions: {
                    expiresIn: '24h'
                }
            }), (0, common_1.forwardRef)(() => users_module_1.UsersModule)
        ],
        exports: [tokens_service_1.TokensService, jwt_1.JwtModule]
    })
], TokensModule);
exports.TokensModule = TokensModule;
//# sourceMappingURL=tokens.module.js.map