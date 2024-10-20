import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { SignInUserDto } from './dto/signIn-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ListAdminDto } from './dto/list-admin.dto';

@Controller('auth')
export class AuthController {
    //의존성 주입
    constructor(private authService : AuthService){};

    @Post('/signup')
    signUp(
        @Body(ValidationPipe) createUserDto : CreateUserDto
    ):Promise<void>{
        return this.authService.signUp(createUserDto);
    }

    @Post('/signin')
    signIn(
        @Body(ValidationPipe) signInUserDto : SignInUserDto
    ){
        return this.authService.signIn(signInUserDto);
    }

    @Get('/admin')
    async findAllAdmin():Promise<ListAdminDto[]>{
        return await this.authService.findAllAdminList();
    }

    @Post('/create/admin')
    createAdmin(
        @Body(ValidationPipe) createAdminDto : CreateAdminDto
    ){
        console.log("asda")
        return this.authService.createAdmin(createAdminDto);
    }
}
