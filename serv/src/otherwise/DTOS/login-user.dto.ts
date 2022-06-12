import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class loginUserDto{
    @ApiProperty({example:"user@mail.ru",description:"Почта пользователя"})
    @IsEmail({},{message:"Неккоректный Email"})
    readonly email:string

    @ApiProperty({example:"userkrutoi_2",description:"Пароль пользователя"})
    @IsString({message:'Должно быть строкой'})
    @Length(6,36,{message:"Не меньше 6 и не больше 36"})
    readonly password:string
}