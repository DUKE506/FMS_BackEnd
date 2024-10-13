import { IsDate, IsString } from "class-validator";



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
}