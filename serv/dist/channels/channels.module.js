"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelsModule = void 0;
const common_1 = require("@nestjs/common");
const channels_service_1 = require("./channels.service");
const channels_controller_1 = require("./channels.controller");
const typeorm_1 = require("@nestjs/typeorm");
const channels_entity_1 = require("./channels.entity");
const servers_module_1 = require("../servers/servers.module");
const files_module_1 = require("../files/files.module");
const tokens_module_1 = require("../tokens/tokens.module");
const directories_module_1 = require("../directory/directories.module");
let ChannelsModule = class ChannelsModule {
};
ChannelsModule = __decorate([
    (0, common_1.Module)({
        providers: [channels_service_1.ChannelsService],
        controllers: [channels_controller_1.ChannelsController],
        imports: [typeorm_1.TypeOrmModule.forFeature([channels_entity_1.ChannelsEntity]), servers_module_1.ServersModule,
            files_module_1.FilesModule, tokens_module_1.TokensModule, directories_module_1.DirectoriesModule],
        exports: [channels_service_1.ChannelsService]
    })
], ChannelsModule);
exports.ChannelsModule = ChannelsModule;
//# sourceMappingURL=channels.module.js.map