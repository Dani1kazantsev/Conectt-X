import {forwardRef, Module} from '@nestjs/common';
import {TokensService} from "../tokens/tokens.service";
import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";

@Module({
    controllers: [],
    providers: [TokensService],
    imports:[
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions:{
                expiresIn:'24h'
            }
        }),forwardRef(() => UsersModule)
    ],
    exports:[TokensService,JwtModule]
})
export class TokensModule {}
