import {ApiProperty} from "@nestjs/swagger";

export class CreateDirectoryDto {
    @ApiProperty({example:"scripts",description:"Название директории"})
    readonly name:string

    @ApiProperty({example:"254",description:"Айди канала которому принадлежит директория"})
    readonly channelId:number

    @ApiProperty({example:"251",description:"Айди директории в которой находится папка, если находится"})
    readonly directoryId?:number

    @ApiProperty({example:"Путь к папке",description:"Если не принадлежит директории, то путь в которой он расположен будет"})
    readonly path?:string
}