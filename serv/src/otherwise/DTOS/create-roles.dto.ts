import {ApiProperty} from "@nestjs/swagger";


export class CreateRolesDto{
    @ApiProperty({example:"1",description:"Идентификатор пользователя"})
    id: number;

    @ApiProperty({example:"user@mail.ru",description:"Уникальная роль пользователя"})
    value: string;

    @ApiProperty({example:"user",description:"Описание/значение роли пользователя"})
    description: string;

}