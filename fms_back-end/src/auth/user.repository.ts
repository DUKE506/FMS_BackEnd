import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcryptjs'
import { CreateAdminDto } from "./dto/create-admin.dto";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private dataSource : DataSource){
        super(User, dataSource.createEntityManager());
    }

    createUser = async (createUserDto : CreateUserDto):Promise<void> => {
        try{
            const {account, password, name, email, image, state} = createUserDto;

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = this.create({
                account,
                password : hashedPassword,
                name,
                email,
                adminYn:false,
                image,
                state,
            });

            await this.save(user);
        }catch(err){
            console.log('[Error][auth][create] 사용자 생성 에러');
            if (err.code = 23505) {
                throw new ConflictException(`${createUserDto.account} is Existing`);
            } else {
                throw new InternalServerErrorException();
            }
        }
        
    }


    createAdmin = async (createAdminDto : CreateAdminDto):Promise<void> => {
        try{
            const {account, password, name, email, phone} = createAdminDto;

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = this.create({
                account,
                password : hashedPassword,
                name,
                email,
                phone,
                adminYn:true,
                state:'WORK',
            });

            await this.save(user);
        }catch(err){
            console.log(err)
            console.log('[Error][auth][create] 사용자 생성 에러');
            if (err.code = 23505) {
                throw new ConflictException(`${createAdminDto.account} is Existing`);
            } else {
                throw new InternalServerErrorException();
            }
        }
        
    }
}