import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
    constructor(
        private authRepository : AuthRepository,
    ){}
    
    signUp = async(createUserDto : CreateUserDto):Promise<User> => {
        try{
            return await this.authRepository.createUser(createUserDto);
        }catch(error){
            console.log(error)
        }
    }
}
