import {Args, Field, Mutation, ObjectType, Query, Resolver} from "@nestjs/graphql";
import {UserModel} from "../users/users.model";
import {AuthService} from "./auth.service";
import {UserInput} from "../otherwise/inputs/user.input";

@ObjectType('Token')
class token {
    @Field()
    token:string
}
@Resolver(()=>UserModel)
export class AuthResolver {
    constructor(private readonly authService:AuthService){
    }
    @Mutation(() => UserModel)
     registration(@Args('UserInput') UserDto:UserInput) {
        return this.authService.registration(UserDto)
    }
    @Query(()=>token)
    async login(@Args('UserInput') UserDto:UserInput){
        return await this.authService.login(UserDto)
    }
}