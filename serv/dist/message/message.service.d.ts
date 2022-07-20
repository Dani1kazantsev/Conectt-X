import { CreateMessageDto } from "../otherwise/DTOS/create-message.dto";
import { MessageEntity } from "./message.entity";
import { Repository } from "typeorm";
export declare class MessageService {
    private messageRepository;
    constructor(messageRepository: Repository<MessageEntity>);
    createMessage(messageDto: CreateMessageDto): Promise<CreateMessageDto & MessageEntity>;
    getMessages(): Promise<MessageEntity[]>;
    getUserMessages(userId: any): Promise<void>;
    getMessageOfUsers(userId: any, myId: any): Promise<MessageEntity[]>;
    saveMessages(arr: any): Promise<boolean>;
}
