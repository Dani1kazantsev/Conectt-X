import {ApiProperty} from "@nestjs/swagger";
import {DirectoriesEntity} from "../../directory/directories.entity";

export class UpdateFileDto {
    @ApiProperty({example:"script",description:"Название файла"})
    name: string;

    @ApiProperty({example:"js",description:"Расширение файла"})
    ext: string;

    @ApiProperty({example:"function script(){console.log('that's work')}",description:"Код внутри файла"})
    data: string;

    @ApiProperty({example:DirectoriesEntity,description:"Директория файла"})
    directory: DirectoriesEntity;
}