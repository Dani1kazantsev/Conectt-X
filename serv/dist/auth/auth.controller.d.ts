import { CreateUserDto } from "../otherwise/DTOS/create-user.dto";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { loginUserDto } from "../otherwise/DTOS/login-user.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: loginUserDto, response: Response): Promise<string>;
    registration(userDto: CreateUserDto, response: Response): Promise<any>;
    activateUser(link: string): Promise<import("../users/users.entity").UsersEntity[]>;
    refreshToken(req: any, response: Response): Promise<string>;
}
