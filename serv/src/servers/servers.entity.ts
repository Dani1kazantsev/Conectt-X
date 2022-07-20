import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {UsersEntity} from "../users/users.entity";
import {ChannelsEntity} from "../channels/channels.entity";
import {DirectoriesEntity} from "../directory/directories.entity";


@Entity({name:"servers"})

export class ServersEntity {
    @ApiProperty({example:"1",description:"Идентификатор сервера"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:"user",description:"Название сервера"})
    @Column("varchar",{length:100})
    name: string;

    @ApiProperty({example:"server/avatars/server-avatar.jpg",description:"Аватарка"})
    @Column("varchar",{default:"servers.png"})
    avatar: string;

    @ApiProperty({example:"Саша",description:"Имя пользователя"})
    @Column("varchar",{nullable:true})
    linkToServer?: string;

    @ApiProperty({example:"Редактор кода",description:"Тип сервера"})
    @Column("varchar")
    type: string;

    @OneToMany(() => ChannelsEntity, (channels) => channels.server)
    channels:ChannelsEntity[]

    @ManyToMany(() => UsersEntity, (user) => user.servers)
    users:UsersEntity[]

    @ManyToOne(() => DirectoriesEntity, (directory) => directory.servers)
    directory:DirectoriesEntity

}