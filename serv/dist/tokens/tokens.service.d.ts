import { JwtService } from "@nestjs/jwt";
import { UsersEntity } from "../users/users.entity";
import { UsersService } from "../users/users.service";
export declare class TokensService {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UsersService);
    generateToken(user: UsersEntity): {
        accessToken: string;
        refreshToken: string;
    };
    validateRefreshToken(token: any): Promise<any>;
    validateAccessToken(token: any): Promise<any>;
    refreshToken(refreshToken: any): Promise<UsersEntity[]>;
}
