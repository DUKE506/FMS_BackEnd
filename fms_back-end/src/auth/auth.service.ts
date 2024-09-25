import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { SignInUserDto } from './dto/signIn-user.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private userRepository : UserRepository,
        private jwtService : JwtService,
    ){}
    
    signUp = async(createUserDto : CreateUserDto):Promise<void> => {
        try{
            return await this.userRepository.createUser(createUserDto);
        }catch(error){
            console.log(error)
        }
    }


    signIn = async(signInUserDto : SignInUserDto):Promise<{ accessToken: string }> => {
        try{
            const {account, password} = signInUserDto;
            const user = await this.userRepository.findOne({
                where:{account},
            })
            if(!user || (await bcrypt.compare(password, (await user).password))){
                throw new UnauthorizedException('Login Failed..')
            }

    
            const payload = {account, user: user.name};
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken}
        }catch(err){
            console.log("[ERROR] [AUTH] [SERVICE] 로그인 에러");
        }
    }
}
