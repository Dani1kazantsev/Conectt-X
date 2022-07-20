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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const users_model_1 = require("../users/users.model");
const auth_service_1 = require("./auth.service");
const user_input_1 = require("../otherwise/inputs/user.input");
let token = class token {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], token.prototype, "token", void 0);
token = __decorate([
    (0, graphql_1.ObjectType)('Token')
], token);
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    registration(UserDto) {
        return this.authService.registration(UserDto);
    }
    async login(UserDto) {
        return await this.authService.login(UserDto);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => users_model_1.UserModel),
    __param(0, (0, graphql_1.Args)('UserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInput]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "registration", null);
__decorate([
    (0, graphql_1.Query)(() => token),
    __param(0, (0, graphql_1.Args)('UserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(() => users_model_1.UserModel),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map