import {BadRequestException, Body, Controller, Get, Param, Post, Req, Res, UsePipes} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../otherwise/DTOS/create-user.dto";
import {AuthService} from "./auth.service";
import {ValidationPipe} from "../otherwise/pipes/validation.pipe";
import {Response} from "express";
import {loginUserDto} from "../otherwise/DTOS/login-user.dto";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {
    }
    @Post('/login')
    async login(@Body() userDto:loginUserDto, @Res({ passthrough: true }) response:Response){
        let tokens = await this.authService.login(userDto)
        response.cookie('refreshToken',tokens.refreshToken)
        return tokens.accessToken
    }
    @Post('/registration')

    async registration(@Body() userDto:CreateUserDto, @Res({ passthrough: true }) response:Response){
        let tokens = await this.authService.registration(userDto)
        if(!tokens.refreshToken ){
            return tokens
        }
        response.cookie('refreshToken',tokens.refreshToken)
        return tokens.accessToken
    }

    @Get('/activate/:link')
    activateUser(@Param('link') link:string) {
        return this.authService.activate(link)
    }

    @Get('/refreshToken')
    async refreshToken(@Req() req, @Res({ passthrough: true }) response:Response){
        const {refreshToken} = req.cookies
        const tokens = await this.authService.refreshToken(refreshToken)
        response.cookie('refreshToken',tokens.refreshToken)
        return tokens.accessToken
    }
}
