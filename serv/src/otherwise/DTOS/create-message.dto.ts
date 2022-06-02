import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class CreateMessageDto {
    @ApiProperty({example:"1",description:"Идентификатор от кого пришло сообщение"})
    @IsNumber()
    @IsNotEmpty()
    readonly fromUserId:number

    @ApiProperty({example:"3",description:"Идентификатор кому пришло сообщение"})
    @IsNumber()
    @IsNotEmpty()
    readonly toUserId:number

    @ApiProperty({example:"3",description:"Текст сообщения"})
    @IsString()
    @IsNotEmpty()
    readonly text:string

    @ApiProperty({example:"03.12",description:"Время отправки сообщения"})
    @IsString()
    @IsNotEmpty()
    readonly data:string
}