import {ApiProperty} from "@nestjs/swagger";

export class SocketDto{
    @ApiProperty({example:"jgkd26-c-4734d",description:"Авто генерируемый айди сокет соединения"})
    socketId: string;

    @ApiProperty({example:"23",description:"Мой айди чата"})
    customId: number;
}