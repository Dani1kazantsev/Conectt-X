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
exports.ServersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const servers_entity_1 = require("./servers.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const directories_service_1 = require("../directory/directories.service");
let ServersService = class ServersService {
    constructor(serversRepository, usersService, directoriesService) {
        this.serversRepository = serversRepository;
        this.usersService = usersService;
        this.directoriesService = directoriesService;
    }
    async findById(id) {
        const user = {
            value: '123',
            rest: {}
        };
        return await this.serversRepository.findOne({ where: { id: id } });
    }
    async createServer(serverDto) {
        const server = await this.serversRepository.save(serverDto);
        server.linkToServer = `${process.env.API_URL}/users/addUserToServer/${server.id}`;
        const directory = await this.directoriesService.saveDirectory(server.name, serverDto.directory);
        const user = await this.usersService.getUserById(serverDto.userId);
        user.servers.push(server);
        await this.usersService.saveUsers([user]);
        return await this.serversRepository.save(Object.assign(Object.assign({}, server), { directory: directory }));
    }
    async addUser(id, userId) {
        const user = await this.usersService.getUserById(userId);
        const server = await this.serversRepository.findOne({
            where: {
                id: id
            },
            relations: {
                users: true
            }
        });
        server.users.push(user);
        return await this.serversRepository.save(server);
    }
};
ServersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(servers_entity_1.ServersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        directories_service_1.DirectoriesService])
], ServersService);
exports.ServersService = ServersService;
//# sourceMappingURL=servers.service.js.map