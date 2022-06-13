import {Entity, Column, PrimaryGeneratedColumn, ManyToMany,} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity({
    name: "message"
})

export class MessageEntity {
    @ApiProperty({example:"10",description:"Идентификатор сообщения"})
    @PrimaryGeneratedColumn({type:"bigint"})
    id: number;

    @ApiProperty({example:"1",description:"Идентификатор от кого пришло сообщение"})
    @Column("int")
    fromUserId: number;

    @ApiProperty({example:"3",description:"Идентификатор кому пришло сообщение"})
    @Column("int")
    toUserId: number;

    @ApiProperty({example:"Привет.",description:"Текст сообщения"})
    @Column("text")
    text: string;

    @ApiProperty({example:"12.02.03",description:"Время сообщения"})
    @Column("varchar")
    data:string
}