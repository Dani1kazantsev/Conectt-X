import {Module} from "@nestjs/common";
import {UsersModule } from './users/users.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./users/users.entity";
import {RoleEntity} from "./roles/roles.entity";
import {RolesModule} from "./roles/roles.module";
import {AuthModule} from "./auth/auth.module";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo"
import { MessageModule } from './message/message.module';
import { MessageEntity } from "./message/message.entity";
import {MailerModule} from "@nestjs-modules/mailer";
import {MailService} from "./mail/mail.service";
import {MailerConfig} from "./otherwise/configs/MailerConfig";
@Module({
    controllers:[],
    providers:[MailService],
    imports: [MailerModule.forRootAsync({
        imports: [ConfigModule],
        inject:[ConfigService],
        useFactory: MailerConfig})
    ,ConfigModule.forRoot({
        envFilePath:`.${process.env.NODE_ENV}.env`
    }),TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        username:  process.env.MYSQL_USER,
        password:  process.env.MYSQL_PASSWORD,
        database:  process.env.MYSQL_DB,
        entities: [UserEntity,RoleEntity,MessageEntity],
        synchronize: true,
    }),GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: true,
        sortSchema: true,
    }),UsersModule,RolesModule,AuthModule, MessageModule]
})
export class AppModule {}