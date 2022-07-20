"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketModule = void 0;
const common_1 = require("@nestjs/common");
const websocket_gateway_1 = require("./websocket.gateway");
const socket_module_1 = require("../socket/socket.module");
const users_module_1 = require("../users/users.module");
let WebsocketModule = class WebsocketModule {
};
WebsocketModule = __decorate([
    (0, common_1.Module)({
        providers: [websocket_gateway_1.WebsocketGateway],
        imports: [socket_module_1.SocketModule, users_module_1.UsersModule]
    })
], WebsocketModule);
exports.WebsocketModule = WebsocketModule;
//# sourceMappingURL=websocket.module.js.map