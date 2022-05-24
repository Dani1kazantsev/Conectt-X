import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
@Entity({
    name: "roles"
})
export class RoleEntity {
    @ApiProperty({example:"1",description:"Идентификатор пользователя"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:"user@mail.ru",description:"Уникальная роль пользователя"})
    @Column("varchar",{length:100})
    value: string;

    @ApiProperty({example:"user",description:"Описание/значение роли пользователя"})
    @Column("varchar",{length:1000})
    description: string;

}
