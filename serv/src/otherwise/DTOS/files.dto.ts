import {ApiProperty} from "@nestjs/swagger";

export class FilesDto{
    @ApiProperty({example:"Закодированная в base64 аватарка",description:"Файл"})
    readonly file:string
    @ApiProperty({example:"3",description:"Ваш идентификатор"})
    readonly myId:number
}