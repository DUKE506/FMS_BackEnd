import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class User extends BaseEntity{

    //식별자
    @PrimaryGeneratedColumn()
    id : number;

    //아이디
    @Column()
    account : string;

    //비밀번호
    @Column()
    password : string;

    //이름
    @Column()
    name : string;

    //이메일
    @Column()
    email : string;

    //이미지
    @Column()
    image : string;

    //관리자 여부
    @Column()
    adminYn : boolean;

    //재직여부
    @Column()
    state : boolean

    //생성 일자
    @Column()
    createdAt : Date;

    //생성자
    @Column()
    createdUser : number;

    //수정일자
    @Column()
    updatedAt : Date

    //수정자
    @Column()
    updatedUser : number

    //삭제여부
    @Column()
    deleteYn : boolean

    //삭제일자
    @Column()
    deletedAt : Date

    
    
}