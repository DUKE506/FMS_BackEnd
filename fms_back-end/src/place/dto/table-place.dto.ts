import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";




export class TablePlaceDto {
    // @IsInt()
    // @IsNotEmpty()
    id: number;

    // @IsString()
    code: string;

    // @IsString()
    name: string;

    // @IsString()
    addr: string;

    // @IsString()
    contractNum: string;

    // @IsString()
    tel: string;

    // @IsDate()
    contractedAt: Date;

    // @IsBoolean()
    state: boolean;
}