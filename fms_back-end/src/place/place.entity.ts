import { BaseEntity, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Place extends BaseEntity {

    //식별자
    @PrimaryGeneratedColumn()
    id: number;

    //사업장 이름
    @Column()
    name: string;

    //사업장 코드
    @Column()
    code: string;

    //계약번호
    @Column({ nullable: true })
    contractNum: string;

    //비고
    @Column({ nullable: true })
    note: string;

    //전화번호
    @Column({ nullable: true })
    tel: string;

    //주소
    @Column({ nullable: true })
    addr: string;

    //상세주소
    @Column({ nullable: true })
    detailAddr: string;

    //해약일자
    @Column({ nullable: true })
    canceledAt: Date;

    //계약일자
    @Column({ nullable: true })
    contractedAt: Date;

    //계약상태
    @Column()
    state: boolean;

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
    @DeleteDateColumn({ nullable: true })
    deletedAt: Date

}