import {Entity, Column, PrimaryGeneratedColumn, ManyToOne,} from 'typeorm';
import {ChannelsEntity} from "../channels/channels.entity";
import {DirectoriesEntity} from "../directory/directories.entity";

@Entity({
    name: "files"
})
export class FilesEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar")
    name: string

    @Column("varchar")
    ext:string

    @ManyToOne(() => ChannelsEntity, (channel) => channel.files)
    channel: ChannelsEntity

    @ManyToOne(() => DirectoriesEntity, (directory) => directory.files)
    directory: DirectoriesEntity
}
