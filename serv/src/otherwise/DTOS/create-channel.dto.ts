import {ApiProperty} from "@nestjs/swagger";

export class CreateChannelDto {
    @ApiProperty({example:"134874",description:"Идентификатор сервера к которому он принадлежит"})
    readonly serverId:number

    @ApiProperty({example:"Голосовой",description:"Тип канала"})
    readonly type:string

    @ApiProperty({example:"Kodland channel",description:"Название канала"})
    readonly name: string;

}