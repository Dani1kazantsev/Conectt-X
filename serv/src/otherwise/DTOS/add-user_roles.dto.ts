import {ApiProperty} from "@nestjs/swagger";


export class AddUserRolesDto {
    @ApiProperty({example:"1",description:"Идентификатор пользователя"})
    readonly id:number

    @ApiProperty({example:"Админ",description:"Название роли"})
    readonly roleValue:string

}