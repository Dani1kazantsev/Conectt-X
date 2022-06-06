import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {UsersEntity} from "../users/users.entity";
import {ChannelsEntity} from "../channels/channels.entity";


@Entity({name:"servers"})

export class ServersEntity {
    @ApiProperty({example:"1",description:"Идентификатор сервера"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:"user",description:"Название сервера"})
    @Column("varchar",{unique:true,length:100})
    name: string;

    @ApiProperty({example:"server/avatars/server-avatar.jpg",description:"Аватарка"})
    @Column("varchar")
    avatar: string;

    @ApiProperty({example:"Саша",description:"Имя пользователя"})
    @Column("varchar")
    linkToServer: string;

    @OneToMany(() => ChannelsEntity, (channels) => channels.server)
    channels:ChannelsEntity[]

    @ManyToMany(() => UsersEntity, (user) => user.servers)
    users:UsersEntity[]

}