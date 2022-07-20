import {ApiProperty} from "@nestjs/swagger";
import {DirectoriesEntity} from "../../directory/directories.entity";


export class CreateServerDto {
    @ApiProperty({example:"conectt-x.ru/serverName:aa2",description:"Ссылка на сервер"})
    linkToServer?:string

    @ApiProperty({example:"server/avatars/server-avatar.jpg",description:"Аватарка"})
    readonly avatar?:string

    @ApiProperty({example:"Kodland server",description:"Название сервера"})
    readonly name: string;

    @ApiProperty({example:"editor",description:"Тип сервера"})
    readonly type: string;

    @ApiProperty({example:"testUser",description:"Директория в которой находится сервер"})
    readonly directory: DirectoriesEntity;

    @ApiProperty({example:"123",description:"Айди пользователя кому принадлежит сервер"})
    readonly userId: number;
}