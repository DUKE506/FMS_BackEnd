import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { SignInUserDto } from './dto/signIn-user.dto';

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
}
