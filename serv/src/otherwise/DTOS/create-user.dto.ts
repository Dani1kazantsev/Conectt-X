import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto{

    @ApiProperty({example:"user",description:"Логин пользователя"})
    @IsString({message:'Должно быть строкой'})
    readonly login:string

    @ApiProperty({example:"user@mail.ru",description:"Почта пользователя"})
    @IsEmail({},{message:"Неккоректный Email"})
    readonly email:string

    @ApiProperty({example:"userkrutoi_2",description:"Пароль пользователя"})
    @IsString({message:'Должно быть строкой'})
    @Length(6,36,{message:"Не меньше 6 и не больше 36"})
    readonly password:string

    @ApiProperty({example:"Кадырбеков",description:"Фамилия пользователи"})
    readonly firstName?:string

    @ApiProperty({example:"Тимур",description:"Имя пользователя"})
    readonly lastName?:string

    @ApiProperty({example:"1s23-5-2kgd-asd3-f2",description:"Ссылка на активацию аккаунта"})
    readonly activationLink?:string

    @ApiProperty({example:"1s2s3zx-5-2kgd-asdas3-f2",description:"Рефреш токен"})
    readonly refreshToken?:string
}