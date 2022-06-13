import {InputType, Field} from '@nestjs/graphql';

@InputType()
export class UserInput {
    @Field()
    login:string

    @Field()
    email:string

    @Field()
    password:string

    @Field()
    activationLink:string

    @Field()
    firstName?:string

    @Field()
    lastName?:string

    @Field()
    refreshToken:string
}