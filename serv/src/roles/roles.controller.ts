import {Body, Controller, Get, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateRolesDto} from "../otherwise/DTOS/create-roles.dto";
import {RolesService} from "./roles.service";
import {RoleEntity} from "./roles.entity";

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(private rolesService:RolesService) {
    }
    @ApiOperation({summary:"Создание пользователя"})
    @ApiResponse({status:200,type:RoleEntity})
    @Post()
    create(@Body()rolesDto:CreateRolesDto){
        return this.rolesService.createRole(rolesDto)
    }
    @ApiOperation({summary:"Получение всех ролей"})
    @ApiResponse({status:200,type:[RoleEntity]})
    @Get()
    getAll(){
        return this.rolesService.getRoles()
    }
}
