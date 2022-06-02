import {Field, Int , ObjectType} from "@nestjs/graphql";
import {RoleModel} from "../roles/roles.model";
import {MessageModel} from "../message/message.model";


@ObjectType('UserModel')
export class UserModel {
    @Field(() => Int)
    id: number

    @Field()
    login: string

    @Field()
    email: string

    @Field()
    password: string

    @Field({nullable:true})
    firstName?: string

    @Field({nullable:true})
    lastName?: string

    @Field()
    isActivated: boolean

    @Field()
    refreshToken:string
    @Field(()=>[RoleModel])
    roles:Array<RoleModel>

    @Field(()=>[MessageModel])
    messages:Array<MessageModel>

    @Field(()=>[UserModel])
    friends:Array<UserModel>
}