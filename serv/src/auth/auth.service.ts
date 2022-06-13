import {BadRequestException,  Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../otherwise/DTOS/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import {MailService} from "../mail/mail.service";
import {TokensService} from "../tokens/tokens.service";
import {UsersEntity} from "../users/users.entity";
import {loginUserDto} from "../otherwise/DTOS/login-user.dto";

@Injectable()
export class AuthService {

    constructor(private userService:UsersService,
                private jwtService:JwtService,
                private mailService:MailService,
                private tokensService:TokensService
                ) {
    }

    async login(userDto:loginUserDto){
        const user = await this.validateUser(userDto)
        return this.tokensService.generateToken(user)
    }
    async registration(userDto:CreateUserDto){
        try {
            const candidateUser = await this.userService.getUserByEmail(userDto.email);

            if(candidateUser){
                throw new BadRequestException("Пользователь с таким email или login уже есть.")
            }
            const hashPassword = await bcrypt.hash(userDto.password,4)
            const activateLink = uuidv4()
            const user:UsersEntity = await this.userService.createUser({...userDto,password:hashPassword,activationLink:activateLink})
            await this.mailService.sendMail(userDto.email,activateLink,userDto.login)
            const tokens = this.tokensService.generateToken(user)
            user.refreshToken = tokens.refreshToken
            this.userService.saveUsers([user])
            return tokens
        }catch (e){
            console.log(e)
            return e
        }

    }

    private async validateUser(userDto: loginUserDto) {
        let passwordEqualsCheck:boolean
        const user = await this.userService.getUserByEmail(userDto.email)
        if(user){
            passwordEqualsCheck = await bcrypt.compare(userDto.password,user.password)
            if(passwordEqualsCheck){
                return user
            }
        }
        throw new UnauthorizedException({message:"Неправильный email или пароль"})
    }
    async activate(link){
        const user:UsersEntity = await this.userService.getUserByParams([{activationLink: link}])
        if(user){
            user.isActivated = true
            return await this.userService.saveUsers([user])
        }
        throw new Error('Неправильная ссылка')
    }
}