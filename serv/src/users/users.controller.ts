import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post, Put,
    Req,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UsersService} from "./users.service";
import {UsersEntity} from "./users.entity";
import {AddUserRolesDto} from "../otherwise/DTOS/add-user_roles.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/guards/roles.guard";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AddFriendDto} from "../otherwise/DTOS/add-friend.dto";
import {TokensService} from "../tokens/tokens.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import { v4 as uuidv4 } from 'uuid';
import * as path from "path";
import {CreateMessageDto} from "../otherwise/DTOS/create-message.dto";
import {MessageEntity} from "../message/message.entity";
import {SocketDto} from "../otherwise/DTOS/socket.dto";
import {unnecessaryAttributes} from "../otherwise/helpers/constants";
@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService,
                private tokensService:TokensService) {
    }
    @ApiOperation({summary:"Добавление роли к пользователю"})
    @ApiResponse({status:200,type:UsersEntity})
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    setRole(@Body()dto:AddUserRolesDto){
        return this.usersService.addRoleToUser(dto.roleValue,dto.id)
    }

    @ApiOperation({summary:"Получение всех пользователей"})
    @ApiResponse({status:200,type:[UsersEntity]})
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll(){
        return this.usersService.getAllUsers()
    }

    @ApiOperation({summary:"Добавление в друзья"})
    @ApiResponse({status:200,type:UsersEntity})
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

    @ApiOperation({summary:"Активация пользователя"})
    @ApiResponse({status:200,type:String})
    @Post('/activate')
    activateUser(@Req() req,@Res() res){
        return this.tokensService.refreshToken(req)
    }

    @ApiOperation({summary:"Активация пользователя"})
    @ApiResponse({status:200,type:String})
    @UseGuards(JwtAuthGuard)
    @Put('/avatar')
    @UseInterceptors(
        FileInterceptor('avatar', {
            storage: diskStorage({
                destination: path.resolve(__dirname,'../../clientFiles/images/avatars'),
                filename: (req,file,cb) =>{
                    const fileName = uuidv4() + req['user'].id
                    const extension = path.parse(file.originalname).ext

                    cb(null,`${fileName}${extension}`)
                }
            })
        })
    )

    editAvatar(@UploadedFile() avatar: Express.Multer.File,@Req() req) {
        return this.usersService.uploadAvatar(avatar,req.user.id)
    }

    @ApiOperation({summary:"Получение ваших данных"})
    @ApiResponse({status:200,type:[UsersEntity]})
    @Get('me:id')
    @UseGuards(JwtAuthGuard)
    async getMe(@Param('id') id){
        let user = await this.usersService.getMeById(id)
        return this.usersService.filterUser(user,unnecessaryAttributes)
    }

    @ApiOperation({summary:"Отправка сообщений"})
    @ApiResponse({status:200,type:[MessageEntity]})
    @Post('/message')
    @UseGuards(JwtAuthGuard)
    async sendMessage(@Body()messageDto: CreateMessageDto){
        return await this.usersService.sendMessages(messageDto)
    }

    @ApiOperation({summary:"Создание чата"})
    @ApiResponse({status:200,type:[UsersEntity]})
    @Post('/socket')
    @UseGuards(JwtAuthGuard)
    async createSocket(@Body()socketDto: SocketDto,@Req() req){
        return await this.usersService.createChat(socketDto,req.user.id)
    }

    @ApiOperation({summary:"Обновление чата"})
    @ApiResponse({status:200,type:[UsersEntity]})
    @Put('/updateSocket')
    @UseGuards(JwtAuthGuard)
    async updateSocket(@Body()dto,@Req() req){
        return await this.usersService.updateChat(dto.socketId,req.user.id)
    }
    @ApiOperation({summary:"Обновление статуса"})
    @ApiResponse({status:200,type:UsersEntity})
    @Put('/status')
    @UseGuards(JwtAuthGuard)
    async updateStatus(@Body()dto,@Req() req){
        return await this.usersService.updateStatus(dto.status,req.user.id)
    }

    @ApiOperation({summary:"Обновление последнего открытого чата"})
    @ApiResponse({status:200,type:UsersEntity})
    @Put('/lastOpenedChat')
    @UseGuards(JwtAuthGuard)
    async updateLastOpenedChat(@Body()chatId,@Req() req){
        return this.usersService.updateOpenedChat(chatId,req.user.id)
    }

    @ApiOperation({summary:"Получение аватарок"})
    @ApiResponse({status:200,type:UsersEntity})
    @Get('/avatar:id')
    async GetAvatar(@Param('id') id){
        return this.usersService.getAvatar(id)
    }
}