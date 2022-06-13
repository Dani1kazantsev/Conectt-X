import {InputType, Field, Int} from '@nestjs/graphql';

@InputType()
export class MessageInput {
    @Field(type =>Int )
    fromUserId:number

    @Field(type =>Int)
    toUserId:number

    @Field()
    text:string

    @Field()
    data:string
}