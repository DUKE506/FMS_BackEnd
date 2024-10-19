import { IsBoolean, IsDate, IsString } from "class-validator";



export class CreatePlaceDto {

    @IsString()
    name: string;

    @IsString()
    code: string;

    @IsString()
    contractNum: string;

    @IsString()
    note: string;

    @IsString()
    tel: string;

    @IsString()
    addr: string;

    @IsString()
    detailAddr: string;

    contractedAt: Date;

    @IsBoolean()
    mahinePerm: boolean

    // 전기 권한
    @IsBoolean()
    electricPerm: boolean;

    // 승강 권한
    @IsBoolean()
    liftPerm: boolean;

    // 소방 권한
    @IsBoolean()
    firePerm: boolean;

    // 건축 권한
    @IsBoolean()
    constructPerm: boolean;

    // 네트워크 권한
    @IsBoolean()
    networkPerm: boolean;

    // 미화 권한
    @IsBoolean()
    beautyPerm: boolean;

    // 에너지 권한
    @IsBoolean()
    energyPerm: boolean;

    // 민원 권한
    @IsBoolean()
    vocPerm: boolean;



}