import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserState } from "./types/user.type";
import { AdminPlace } from "src/admin-place/admin-place.entity";
import { Group } from "src/group/group.entity";

@Entity()
export class User extends BaseEntity {

    //식별자
    @PrimaryGeneratedColumn()
    id: number;

    //아이디
    @Column()
    account: string;

    //비밀번호
    @Column()
    password: string;

    //이름
    @Column()
    name: string;

    //이메일
    @Column({ nullable: true })
    email: string;

    //이미지
    @Column({ nullable: true })
    image: string;

    //전화번호
    @Column({ nullable: true })
    phone: string;

    //직무
    @Column({ nullable: true })
    job: string;

    //관리자 여부
    @Column({ nullable: true })
    adminYn: boolean;

    //재직여부
    @Column({ nullable: true })
    state: UserState;

    //생성 일자
    @Column({ nullable: true })
    createdAt: Date;

    //생성자
    @Column({ nullable: true })
    createdUser: number;

    //수정일자
    @Column({ nullable: true })
    updatedAt: Date

    //수정자
    @Column({ nullable: true })
    updatedUser: number

    //삭제여부
    @Column({ nullable: true })
    deleteYn: boolean

    //삭제일자
    @Column({ nullable: true })
    deletedAt: Date

    @OneToMany(type => AdminPlace, adminplace => adminplace.user)
    adminplaces: AdminPlace[]

    @ManyToOne(type => Group, group => group.id)
    @JoinColumn({name:'groupId'})
    group : Group
}