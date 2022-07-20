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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const roles_entity_1 = require("./roles.entity");
let RolesService = class RolesService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async createRole(dto) {
        const role = await this.roleRepository.save(dto);
        return role;
    }
    async getRoles() {
        const role = await this.roleRepository.find();
        return role;
    }
    async findRoleByValue(value) {
        const role = await this.roleRepository.findOne({ where: { value: value } });
        return role;
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(roles_entity_1.RoleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map