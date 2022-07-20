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
var UserModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const graphql_1 = require("@nestjs/graphql");
const roles_model_1 = require("../roles/roles.model");
const message_model_1 = require("../message/message.model");
let UserModel = UserModel_1 = class UserModel {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UserModel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserModel.prototype, "login", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], UserModel.prototype, "isActivated", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserModel.prototype, "refreshToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => [roles_model_1.RoleModel]),
    __metadata("design:type", Array)
], UserModel.prototype, "roles", void 0);
__decorate([
    (0, graphql_1.Field)(() => [message_model_1.MessageModel]),
    __metadata("design:type", Array)
], UserModel.prototype, "messages", void 0);
__decorate([
    (0, graphql_1.Field)(() => [UserModel_1]),
    __metadata("design:type", Array)
], UserModel.prototype, "friends", void 0);
UserModel = UserModel_1 = __decorate([
    (0, graphql_1.ObjectType)('UserModel')
], UserModel);
exports.UserModel = UserModel;
//# sourceMappingURL=users.model.js.map