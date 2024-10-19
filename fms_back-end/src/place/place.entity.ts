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
    @Column({ nullable: true })
    state: boolean;

    // 기계 권한
    @Column({ nullable: true })
    machinePerm: boolean;

    // 전기 권한
    @Column({ nullable: true })
    electricPerm: boolean;

    // 승강 권한
    @Column({ nullable: true })
    liftPerm: boolean;

    // 소방 권한
    @Column({ nullable: true })
    firePerm: boolean;

    // 건축 권한
    @Column({ nullable: true })
    constructPerm: boolean;

    // 네트워크 권한
    @Column({ nullable: true })
    networkPerm: boolean;

    // 미화 권한
    @Column({ nullable: true })
    beautyPerm: boolean;

    // 미화 권한
    @Column({ nullable: true })
    securityPerm: boolean;

    // 에너지 권한
    @Column({ nullable: true })
    energyPerm: boolean;

    // 민원 권한
    @Column({ nullable: true })
    vocPerm: boolean;

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