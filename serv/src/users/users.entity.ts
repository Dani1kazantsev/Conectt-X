import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, JoinColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {RoleEntity} from "../roles/roles.entity";
import {MessageEntity} from "../message/message.entity";
import {ServersEntity} from "../servers/servers.entity";
import {SocketEntity} from "../socket/socket.entity";

@Entity({
    name: "users"
})

export class UsersEntity {
    @ApiProperty({example:"1",description:"Идентификатор пользователя"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:"user",description:"Логин пользователя"})
    @Column("varchar",{unique:true,length:100})
    login: string;

    @ApiProperty({example:"user@mail.ru",description:"Почта пользователя"})
    @Column("varchar",{unique:true,length:100,default:'src/img/manifest/messenger/user1.png'})
    email: string;

    @ApiProperty({example:"server/avatars/user-avatar.jpg",description:"Аватарка"})
    @Column("varchar",{default:'user.png'})
    avatar: string;

    @ApiProperty({example:"userkrutoi_2",description:"Пароль пользователя"})
    @Column("varchar",{length:100})
    password: string;

    @ApiProperty({example:"Саша",description:"Имя пользователя"})
    @Column("varchar",{length:100,nullable:true})
    firstName: string;

    @ApiProperty({example:"Казанцев",description:"Фамилия пользователя"})
    @Column("varchar",{length:100,nullable:true})
    lastName: string;

    @ApiProperty({example:"false",description:"Активирован ли пользователь"})
    @Column("boolean",{default:false})
    isActivated: boolean;

    @ApiProperty({example:"iask5-12as-kg-sk4-ddsds",description:"Ссылка на активацию"})
    @Column("varchar",{nullable:true})
    activationLink: string;

    @ApiProperty({example:"1s2s3zx-5-2kgd-asdas3-f2",description:"Рефреш токен"})
    @Column("varchar",{nullable:true})
    refreshToken:string

    @ApiProperty({example:"Я начинающий разработчик,привет",description:"Статус пользователя"})
    @Column("varchar",{default:'',nullable:true})
    status:string

    @ManyToMany(()=>RoleEntity)
    @JoinTable()
    roles:RoleEntity[]

    @ManyToMany(()=>MessageEntity)
    @JoinTable()
    messages:MessageEntity[]

    @ManyToMany(()=>UsersEntity)
    @JoinTable()
    friends:UsersEntity[]

    @ManyToMany(()=>ServersEntity, (servers) => servers.users)
    @JoinTable()
    servers:ServersEntity[]

    @OneToOne(()=> SocketEntity )
    @JoinColumn()
    chat:SocketEntity
}