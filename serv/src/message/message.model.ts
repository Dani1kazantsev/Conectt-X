import {Field, Int, ObjectType} from "@nestjs/graphql";


@ObjectType("message")
export class MessageModel {
    @Field(()=>Int)
    id: number;

    @Field(()=>Int)
    fromUserId: number;

    @Field(()=>Int)
    toUserId: number;

    @Field()
    text: string;

    @Field()
    data:string
}