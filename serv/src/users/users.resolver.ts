import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {UserModel} from "./users.model";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {UsersService} from "./users.service";
import {Any} from "typeorm";

@Resolver(()=>UserModel)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
    constructor(private readonly userService:UsersService){
    }
    @Query(() => [UserModel])
    getUsers() {
        return this.userService.getAllUsers()
    }
    @Query(() => UserModel)
    getUserById(@Args('id') id:number){
        return this.userService.getUserById(id)
    }
    @Mutation(() => UserModel)
    async setRole(
        @Args('roleName') roleName:string,
        @Args('userId') userId:number
    ){
        return this.userService.addRoleToUser(roleName, userId)
    }
    @Mutation(() => UserModel)
    async addNewFriend(
        @Args('myId') myId:number,
        @Args('userId') userId:number
    ){
        return await this.userService.addFriend(myId, userId)
    }
}