import {Field, Int , ObjectType} from "@nestjs/graphql";

@ObjectType('RoleModel')
export class RoleModel {
    @Field(() => Int)
    id: number

    @Field()
    value: string

    @Field()
    description: string

}