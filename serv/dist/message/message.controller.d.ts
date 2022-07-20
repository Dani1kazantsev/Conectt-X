import { MessageService } from "./message.service";
import { CreateMessageDto } from "../otherwise/DTOS/create-message.dto";
import { MessageEntity } from "./message.entity";
export declare class MessageController {
    private messageService;
    constructor(messageService: MessageService);
    create(messageDto: CreateMessageDto): Promise<CreateMessageDto & MessageEntity>;
    allMessages(): Promise<MessageEntity[]>;
    changeMessage(array: MessageEntity[]): Promise<boolean>;
}
