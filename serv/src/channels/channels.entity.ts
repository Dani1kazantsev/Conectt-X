import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {ServersEntity} from "../servers/servers.entity";
import {FilesEntity} from "../files/files.entity";
import {DirectoriesEntity} from "../directory/directories.entity";


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

    @OneToMany(() => FilesEntity, (files) => files.channel)
    files:FilesEntity[]

    @OneToMany(() => DirectoriesEntity, (directories) => directories.channel)
    directories:DirectoriesEntity[]
}