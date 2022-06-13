import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {AuthResolver} from "./auth.resolver";
import {MailModule} from "../mail/mail.module";
import {TokensModule} from "../tokens/tokens.module";
@Module({
  controllers: [AuthController],
  providers: [AuthService,AuthResolver],
  imports:[MailModule,TokensModule,
      forwardRef(()=>UsersModule),
    JwtModule.register({
    secret: process.env.PRIVATE_KEY || 'SECRET',
    signOptions:{
      expiresIn:'24h'
    }
  })],
  exports:[
      AuthService,
      JwtModule
  ]
})
export class AuthModule {}
