import {Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UsersEntity} from "../users/users.entity";
import {UsersService} from "../users/users.service";


@Injectable()
export class TokensService {
    constructor(private jwtService:JwtService,
                private userService:UsersService
                ) {
    }
    generateToken(user:UsersEntity){
        const payload = {login:user.login,email:user.email,id:user.id}
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
    async validateRefreshToken(token){
        try {
            const userData =this.jwtService.verify(token, {secret:process.env.JWT_REFRESH_SECRET})
            return userData
        }catch (e){
            return null
        }
    }
    async validateAccessToken(token){
        try {
            const userData = this.jwtService.verify(token, {secret:process.env.JWT_ACCESS_SECRET})
            return userData
        }catch (e){
            return null
        }
    }
    async refreshToken(refreshToken){
        const user = await this.userService.getUserByParams([{refreshToken:refreshToken}])
        if(user){
            
        }
        return await this.userService.saveUsers([user])
    }
}



