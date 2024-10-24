import { Injectable } from "@nestjs/common";
import { Admin, DataSource, Repository } from "typeorm";
import { AdminPlace } from "./admin-place.entity";
import { Place } from "src/place/place.entity";
import { User } from "src/auth/user.entity";


@Injectable()
export class AdminPlaceRepository extends Repository<AdminPlace>{
    constructor(
        private dataSource : DataSource
    ){
        super(AdminPlace, dataSource.createEntityManager());
    }

    createPlaceAdmin = async (place : Place, admins : User[]) => {
        try{
            for(const admin of admins){
                const placeAdmin = this.create({
                    place : {id : place.id},
                    user : {id : admin.id},
                })
                await this.save(placeAdmin);
            }
        }catch(err){
            //에러처리
        }
    }
}