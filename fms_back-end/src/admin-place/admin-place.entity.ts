import { User } from "src/auth/user.entity";
import { Place } from "src/place/place.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class AdminPlace extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    //생성 일자
    @Column({ nullable: true })
    createdAt : Date;

    //생성자
    @Column({ nullable: true })
    createdUser : number;

    //수정일자
    @Column({ nullable: true })
    updatedAt : Date

    //수정자
    @Column({ nullable: true })
    updatedUser : number

    //삭제여부
    @Column({ nullable: true })
    deleteYn : boolean

    //삭제일자
    @Column({ nullable: true })
    deletedAt : Date

    @ManyToOne(type => User, user => user.adminplaces)
    user:User;

    @ManyToOne(type => Place, place => place.adminplaces)
    @JoinColumn({name : 'placeId'})
    place:Place;
}