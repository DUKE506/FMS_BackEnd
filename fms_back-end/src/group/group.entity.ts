import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Group extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

}