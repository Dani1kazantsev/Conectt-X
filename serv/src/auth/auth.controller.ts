import {Body, Controller, Get, Param, Post, UsePipes} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../otherwise/DTOS/create-user.dto";
import {AuthService} from "./auth.service";
import {ValidationPipe} from "../otherwise/pipes/validation.pipe";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService) {
    }

    @Post('/login')
    login(@Body()userDto:CreateUserDto){
        return this.authService.login(userDto)
    }
    @Post('/registration')
    registration(@Body()userDto:CreateUserDto){
        return this.authService.registration(userDto)
    }

    @Get('/activate/:link')
    activateUser(@Param('link') link:string) {
        return this.authService.activate(link)
    }
}
