import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";


export class Place extends BaseEntity{
    
    //식별자
    @PrimaryGeneratedColumn()
    id : number;

    //사업장 이름
    @Column()
    name : string;

    //사업장 코드
    @Column()
    code : string;

    //계약번호
    @Column()
    contractNum : string;

    //비고
    @Column()
    note : string;

    //전화번호
    @Column()
    tel : string;

    //주소
    @Column()
    addr:string;

    //상세주소
    @Column()
    detailAddr:string;

    //해약일자
    @Column()
    canceledAt:Date;

    //계약일자
    @Column()
    contractedAt:Date;

    //계약상태
    @Column()
    state : number;

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