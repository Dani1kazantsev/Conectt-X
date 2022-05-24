import {Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../otherwise/DTOS/create-user.dto";
import {UsersService} from "./users.service";
import {UserEntity} from "./users.entity";
import {AddUserRolesDto} from "../otherwise/DTOS/add-user_roles.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/guards/roles.guard";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {ValidationPipe} from "../otherwise/pipes/validation.pipe";
import {AddFriendDto} from "../otherwise/DTOS/add-friend.dto";
import {TokensService} from "../tokens/tokens.service";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService,
                private tokensService:TokensService) {
    }
    @ApiOperation({summary:"Создание пользователя"})
    @ApiResponse({status:200,type:UserEntity})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body()userDto:CreateUserDto){
        return this.usersService.createUser(userDto)
    }
    @ApiOperation({summary:"Добавление роли к пользователю"})
    @ApiResponse({status:200,type:UserEntity})
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    setRole(@Body()dto:AddUserRolesDto){
        return this.usersService.addRoleToUser(dto.roleValue,dto.id)
    }

    @ApiOperation({summary:"Получение всех пользователей"})
    @ApiResponse({status:200,type:[UserEntity]})
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll(){
        return this.usersService.getAllUsers()
    }

    @ApiOperation({summary:"Добавление в друзья"})
    @ApiResponse({status:200,type:UserEntity})
    @UseGuards(JwtAuthGuard)
    @Post('/friend')
    addNewFriend(@Body()dto:AddFriendDto){
        return this.usersService.addFriend(dto.myId,dto.userId)
    }

    @ApiOperation({summary:"Обновление токена"})
    @ApiResponse({status:200,type:String})
    @UseGuards(JwtAuthGuard)
    @Post('/refreshToken')
    refreshToken(@Req() req,@Res() res){
        return this.tokensService.refreshToken(req)
    }

    @ApiOperation({summary:"Обновление токена"})
    @ApiResponse({status:200,type:String})
    @Post('/activate')
    activateUser(@Req() req,@Res() res){
        return this.tokensService.refreshToken(req)
    }
}