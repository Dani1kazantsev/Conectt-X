import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {MessageModel} from "./message.model";
import {MessageService} from "./message.service";
import {MessageInput} from "../otherwise/inputs/message.input";

@Resolver(()=>MessageModel)
@UseGuards(JwtAuthGuard)
export class MessageResolver {
    constructor(private readonly messageService:MessageService){
    }
    @Query(() => [MessageModel])
    async getMessages() {
        return await this.messageService.getMessages()
    }
    @Query(() => [MessageModel])
    async getMessageOfUser(@Args('userId') userId: number) {
        return await this.messageService.getUserMessages(userId)
    }
    @Mutation(returns => MessageModel)
    async createMessage(@Args('messageInput') messageDto:MessageInput){
        return await this.messageService.createMessage(messageDto)
    }
}