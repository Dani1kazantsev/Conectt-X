import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity({
    name: "socket"
})

export class SocketEntity {
    @ApiProperty({example:"1",description:"Идентификатор пользователя"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:"jgkd26-c-4734d",description:"Авто генерируемый айди сокет соединения"})
    @Column("varchar",{unique:true})
    socketId: string;

    @ApiProperty({example:"23",description:"Мой айди чата"})
    @Column("bigint",{unique:true})
    customId: number;

}