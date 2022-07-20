import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne,} from 'typeorm';
import {ChannelsEntity} from "../channels/channels.entity";
import {FilesEntity} from "../files/files.entity";
import {ServersEntity} from "../servers/servers.entity";
import {UsersEntity} from "../users/users.entity";

@Entity({
    name: "directories"
})
export class DirectoriesEntity {
    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column("varchar")
    name: string

    @Column("varchar")
    path: string

    @ManyToOne(() => ChannelsEntity, (channel) => channel.directories)
    channel: ChannelsEntity

    @OneToMany(() => FilesEntity, (files) => files.directory)
    files:FilesEntity[]

    @OneToMany(() => DirectoriesEntity, (directories) => directories.directory)
    directories:DirectoriesEntity[]

    @ManyToOne(() => DirectoriesEntity, (directory) => directory.directories)
    directory: DirectoriesEntity

    @OneToMany(() => ServersEntity, (servers) => servers.directory)
    servers:ServersEntity[]

    @OneToOne(()=> UsersEntity)
    user:UsersEntity
}
