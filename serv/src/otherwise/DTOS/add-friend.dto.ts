import {ApiProperty} from "@nestjs/swagger";

export class AddFriendDto{
    @ApiProperty({example:"1",description:"Мой идентификатор"})
    readonly myId:number

    @ApiProperty({example:"33",description:"Идентификатор друга"})
    readonly userId:number
}

