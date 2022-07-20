import { SocketEntity } from "./socket.entity";
import { Repository } from "typeorm";
import { SocketDto } from "../otherwise/DTOS/socket.dto";
export declare class SocketService {
    private socketRepository;
    constructor(socketRepository: Repository<SocketEntity>);
    createSocket(socketDto: SocketDto): Promise<SocketDto & SocketEntity>;
    findSocket(customId: number): Promise<SocketEntity>;
    updateSocket(socket: SocketEntity): Promise<SocketEntity>;
}
