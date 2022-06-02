import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {RoleEntity} from "../roles/roles.entity";
import {MessageEntity} from "../message/message.entity";

@Entity({
    name: "user"
})

export class UserEntity {
    @ApiProperty({example:"1",description:"Идентификатор пользователя"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:"user",description:"Логин пользователя"})
    @Column("varchar",{unique:true,length:100})
    login: string;

    @ApiProperty({example:"user@mail.ru",description:"Почта пользователя"})
    @Column("varchar",{unique:true,length:100})
    email: string;

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

    @ManyToMany(()=>RoleEntity)
    @JoinTable()
    roles:RoleEntity[]

    @ManyToMany(()=>MessageEntity)
    @JoinTable()
    messages:MessageEntity[]

    @ManyToMany(()=>UserEntity)
    @JoinTable()
    friends:UserEntity[]
}