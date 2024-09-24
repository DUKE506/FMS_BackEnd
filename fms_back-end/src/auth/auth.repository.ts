import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class AuthRepository extends Repository<User>{
    constructor(private dataSource : DataSource){
        super(User, dataSource.createEntityManager());
    }

    createUser = async (createUserDto : CreateUserDto):Promise<User> => {
        try{
            console.log(createUserDto)
            return;    
        }catch(error){

        }
        
    }
}