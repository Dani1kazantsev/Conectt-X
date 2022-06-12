import {ApiProperty} from "@nestjs/swagger";


export class FriendsDto {
    @ApiProperty({example:"1",description:"Идентификатор друга"})
    readonly id: number;

    @ApiProperty({example:"user",description:"Логин друга"})
    readonly login: string;

    @ApiProperty({example:"user@mail.ru",description:"Почта друга"})
    readonly email: string;

    @ApiProperty({example:"server/avatars/user-avatar.jpg",description:"Аватарка друга"})
    readonly avatar: string;

    @ApiProperty({example:"Саша",description:"Имя друга"})
    readonly firstName: string;

    @ApiProperty({example:"Казанцев",description:"Фамилия друга"})
    readonly lastName: string;

    @ApiProperty({example:"Я начинающий разработчик,привет",description:"Статус друга"})
    readonly status:string

}