import {forwardRef, Module} from '@nestjs/common';
import {UsersController } from './users.controller';
import {UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./users.entity";
import {RoleEntity} from "../roles/roles.entity";
import {AuthModule} from "../auth/auth.module";
import {RolesModule} from "../roles/roles.module";
import {UsersResolver} from "./users.resolver";
import {MessageEntity} from "../message/message.entity";
import {TokensModule} from "../tokens/tokens.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService,UsersResolver],
  imports:[forwardRef(()=>TokensModule),
      forwardRef(()=>AuthModule),
      RolesModule,
      TypeOrmModule.forFeature([UserEntity,RoleEntity,MessageEntity])
  ], exports:[
      UsersService]
})
export class UsersModule {}
