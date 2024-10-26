import { IsString, Matches, MinLength } from "class-validator";
import { UserState } from "../types/user.type";


export class CreateAdminDto {
    @IsString()
    account: string;

    @IsString()
    @MinLength(3)
    // @Matches(/^[a-zA-Z0-9]*$/, {
    //     message: 'password only accepts english and number'
    // })
    password: string;

    @IsString()
    name: string;

    @IsString()
    // @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,{
    //     message : '이메일 형식에 맞지 않습니다.'
    // })
    email: string;

    @IsString()
    phone: string;

    place: number[];

    job: string;

    adminYn: string;

    // @IsString()
    // state : UserState;
}