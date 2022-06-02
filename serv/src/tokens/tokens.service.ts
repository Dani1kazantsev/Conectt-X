import {Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserEntity} from "../users/users.entity";
import {UsersService} from "../users/users.service";


@Injectable()
export class TokensService {
    constructor(private jwtService:JwtService,
                private userService:UsersService
                ) {
    }
    generateToken(user:UserEntity){
        const payload = {email:user.email,id:user.id,roles:user.roles}
        return{
            accessToken:this.jwtService.sign(payload,{
                expiresIn:'1d',
                secret:process.env.JWT_ACCESS_SECRET
            }),
            refreshToken:this.jwtService.sign(payload,{
                expiresIn:'30d',
                secret:process.env.JWT_REFRESH_SECRET
            })
        }
    }
    async refreshToken(refreshToken){
        const user = await this.userService.getUserByParams([{refreshToken:refreshToken}])
        if(user){
            
        }
        return await this.userService.saveUsers([user])
    }
}



