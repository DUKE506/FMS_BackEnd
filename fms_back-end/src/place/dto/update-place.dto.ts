import { IsString } from "class-validator";


export class  UpdatePlaceDTO {

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
    
    contractedAt: Date;
}