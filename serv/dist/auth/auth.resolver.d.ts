import { AuthService } from "./auth.service";
import { UserInput } from "../otherwise/inputs/user.input";
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    registration(UserDto: UserInput): Promise<any>;
    login(UserDto: UserInput): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
