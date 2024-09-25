import { IsString, Matches, MinLength } from "class-validator";



export class SignInUserDto{

    @IsString()
    account : string;

    @IsString()
    @MinLength(3)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    password : string;
}