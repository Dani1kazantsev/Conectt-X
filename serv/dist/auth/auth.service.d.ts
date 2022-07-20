import { CreateUserDto } from "../otherwise/DTOS/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "../mail/mail.service";
import { TokensService } from "../tokens/tokens.service";
import { UsersEntity } from "../users/users.entity";
import { loginUserDto } from "../otherwise/DTOS/login-user.dto";
import { MessageService } from "../message/message.service";
import { ServersService } from "../servers/servers.service";
import { ChannelsService } from "../channels/channels.service";
import { DirectoriesService } from "../directory/directories.service";
export declare class AuthService {
    private userService;
    private jwtService;
    private mailService;
    private tokensService;
    private messageService;
    private serversService;
    private channelsService;
    private directoriesService;
    constructor(userService: UsersService, jwtService: JwtService, mailService: MailService, tokensService: TokensService, messageService: MessageService, serversService: ServersService, channelsService: ChannelsService, directoriesService: DirectoriesService);
    login(userDto: loginUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    registration(userDto: CreateUserDto): Promise<any>;
    private validateUser;
    activate(link: any): Promise<UsersEntity[]>;
    refreshToken(refreshToken: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
