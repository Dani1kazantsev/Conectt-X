import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolesController} from "./roles.controller";
import {RolesService} from "./roles.service";
import {RoleEntity} from "./roles.entity";
import {UserEntity} from "../users/users.entity";

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [
        TypeOrmModule.forFeature([RoleEntity,UserEntity])
    ],
    exports:[RolesService]

})
export class RolesModule {}
