import {ApiProperty} from "@nestjs/swagger";


export class CreateFilesDto {
    @ApiProperty({example:"script",description:"Название файла"})
    readonly name:string

    @ApiProperty({example:"js",description:"Расширение файла"})
    readonly ext:string

    @ApiProperty({example:"Канал редактор кода",description:"К какому каналу присоединен"})
    readonly channelId:number

    @ApiProperty({example:"for(let i = 0; i < 10; i++){}",description:"Внутренние данные файла"})
    data:string

    @ApiProperty({example:"/scripts",description:"В какой директории находится файл"})
    path:string
}