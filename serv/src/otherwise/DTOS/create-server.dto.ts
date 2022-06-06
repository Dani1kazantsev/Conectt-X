import {ApiProperty} from "@nestjs/swagger";


export class CreateServerDto {
    @ApiProperty({example:"1",description:"Идентификатор сервера"})
    readonly id:number

    @ApiProperty({example:"conectt-x.ru/serverName:aa2",description:"Ссылка на сервер"})
    linkToServer?:string

    @ApiProperty({example:"server/avatars/server-avatar.jpg",description:"Аватарка"})
    readonly avatar:string

    @ApiProperty({example:"Kodland server",description:"Название сервера"})
    readonly name: string;

}