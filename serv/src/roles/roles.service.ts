import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {getRepository, Repository} from "typeorm";
import {RoleEntity} from "./roles.entity";
import {CreateRolesDto} from "../otherwise/DTOS/create-roles.dto";


@Injectable()
export class RolesService {
    constructor(@InjectRepository(RoleEntity) private roleRepository:Repository<RoleEntity>) {
    }
    async createRole(dto:CreateRolesDto){
        const role = await this.roleRepository.save(dto)
        return role;
    }
    async getRoles(){
        const role = await this.roleRepository.find();
        return role;
    }
    async findRoleByValue(value:string){
        const role = await getRepository(RoleEntity).findOne({where:{value:value}})
        return role;
    }
}