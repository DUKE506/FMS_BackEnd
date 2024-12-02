import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Admin, DataSource, EntityManager, Repository } from "typeorm";
import { AdminPlace } from "./admin-place.entity";
import { Place } from "src/place/place.entity";
import { User } from "src/auth/user.entity";
import { Group } from "src/group/group.entity";


@Injectable()
export class AdminPlaceRepository extends Repository<AdminPlace> {
    constructor(
        private dataSource: DataSource
    ) {
        super(AdminPlace, dataSource.createEntityManager());
    }

    /**
     * 사업장 생성시 관리자 추가
     * @param place 
     * @param admins 
     * @param transactionManager 
     */
    createPlaceAdmin = async (place: Place, admins: User[], transactionManager: EntityManager) => {
        try {
            for (const admin of admins) {
                const placeAdmin = this.create({
                    place: { id: place.id },
                    user: { id: admin.id },
                    createdAt : new Date(),
                })
                await transactionManager.save(placeAdmin);
            }
        } catch (err) {
            throw new InternalServerErrorException(`PlaceAdmin 생성 중 오류 발생: ${err.message}`);
        }
    }


    /**
     * 관리자 생성시 사업장 추가
     */
    createAdminPlace = async (places: Place[], admin: User, transactionManager: EntityManager) => {
        try {
            for (const place of places) {
                const adminPlace = this.create({
                    place: { id: place.id },
                    user: { id: admin.id },
                })
                // await this.save(adminPlace);
                await transactionManager.save(adminPlace);
            }
        } catch (err) {
            //에러처리
        }
    }


}