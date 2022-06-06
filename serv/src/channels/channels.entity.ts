import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {UsersEntity} from "../users/users.entity";
import {ServersEntity} from "../servers/servers.entity";


@Entity({name:"channels"})

export class ChannelsEntity {
    @ApiProperty({example:"1",description:"Идентификатор канала"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:"Редактор кода",description:"Тип канала"})
    @Column("varchar")
    type: string;

    @ApiProperty({example:"Собрание учителей",description:"Название канала"})
    @Column("varchar")
    name: string;


    @ManyToOne(()=>ServersEntity,(server)=> server.channels)
    server:ServersEntity

}