import { MessageService } from "./message.service";
import { MessageInput } from "../otherwise/inputs/message.input";
export declare class MessageResolver {
    private readonly messageService;
    constructor(messageService: MessageService);
    getMessages(): Promise<import("./message.entity").MessageEntity[]>;
    getMessageOfUser(userId: number): Promise<void>;
    createMessage(messageDto: MessageInput): Promise<import("../otherwise/DTOS/create-message.dto").CreateMessageDto & import("./message.entity").MessageEntity>;
}
