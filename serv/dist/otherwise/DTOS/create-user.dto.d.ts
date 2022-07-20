export declare class CreateUserDto {
    readonly login: string;
    readonly email: string;
    readonly password: string;
    readonly firstName?: string;
    readonly lastName?: string;
    readonly activationLink?: string;
    readonly refreshToken?: string;
}
