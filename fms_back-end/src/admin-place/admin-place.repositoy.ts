import { Injectable } from "@nestjs/common";
import { Admin, DataSource, EntityManager, Repository } from "typeorm";
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


    createAdminPlace = async (places : Place[], admin : User, transactionManager : EntityManager) => {
        try{
            for(const place of places){
                const adminPlace = this.create({
                    place : {id : place.id},
                    user : {id : admin.id},
                })
                // await this.save(adminPlace);
                await transactionManager.save(adminPlace);
            }
        }catch(err){
            //에러처리
        }
    }
}