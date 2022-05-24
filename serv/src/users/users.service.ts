import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./users.entity";
import {CreateUserDto} from "../otherwise/DTOS/create-user.dto";
import { Repository} from "typeorm";
import {RoleEntity} from "../roles/roles.entity";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity)
                private userRepository:Repository<UserEntity>,
                private rolesService:RolesService) {
    }
    async createUser(dto:CreateUserDto){
        try {
            const role:RoleEntity = await this.rolesService.findRoleByValue('User');
            const user = await this.userRepository.save(dto)
            user.roles.push(role)
            return await this.userRepository.save(user);
        }catch (e) {
            return e;
        }

    }
    async getAllUsers(){
        const users = await this.userRepository.find({ relations: [
            "roles", "messages","friends"] });
        return users;
    }
    async addRoleToUser(roleValue:string, userId:number){
        const role:RoleEntity = await this.rolesService.findRoleByValue(roleValue)
        let user = await this.userRepository.findOne({
            where:{id:userId},
            relations:["roles"]
        });
        if(user.roles.find(item=>item.value === role.value)){
            return user;
        }
        user.roles.push(role)
        user = await this.userRepository.save(user)
        return user;
    }
    async getUserByEmail(email:string){
        const user = await this.userRepository.findOne({where:{email:email},
            relations: ["roles", "messages","friends"]})
        return user
    }
    async getUserByParams(params:Array<object>){
        const user:UserEntity = await this.userRepository.findOne({
            where:params,
            relations: ["roles", "messages","friends"]
        })
        return user
    }
    async getUserById(id:number){
        const user:UserEntity = await this.userRepository.findOne({
            where:{id:id},
            relations: ["roles", "messages","friends"]
        })
        return user
    }
    async saveUsers(users:UserEntity[]){
        const returnUsers:Array<UserEntity> = []
        for (let i = 0; i < users.length; i++) {
            let user = await this.userRepository.save(users[i]);
            returnUsers.push(user)
        }
        return returnUsers;
    }
    async addFriend(myId,userId){
        const user:UserEntity = await this.userRepository.findOne({
            where:{id:myId},
            relations:["friends"]
        })
        const friend = await this.userRepository.findOneById(userId)
        if(!user.friends.find(item=>item.id === userId)&&userId !== myId){
            user.friends.push(friend)
            return await this.userRepository.save(user)
        }
        return user
    }
    async refreshToken(){

    }

    async activateAccount(link){
        const user:UserEntity = await this.userRepository.findOne({
            where:{activationLink:link}
        })
        if(!user) throw new HttpException('Неправильная ссылка.',HttpStatus.BAD_REQUEST)
        user.isActivated = true
        return await this.userRepository.save(user)
    }
}
