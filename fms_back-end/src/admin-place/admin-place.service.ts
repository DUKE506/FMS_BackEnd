import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AdminPlaceRepository } from './admin-place.repositoy';
import { CreatePlaceAdminDto } from './dto/create-place-admin-dto';
import { AuthService } from 'src/auth/auth.service';
import { PlaceService } from 'src/place/place.service';
import { AdminPlaceDto, PlaceAdminDto } from './dto/detail-admin-place.dto';
import { In, Not } from 'typeorm';
import { AdminPlace } from './admin-place.entity';

@Injectable()
export class AdminPlaceService {
    constructor(
        private adminPlaceRepository: AdminPlaceRepository,
        
        private authService: AuthService,
        
        private placeService: PlaceService

    ) { }


    // createPlaceAdmin = async (createPlaceAdminDto: CreatePlaceAdminDto) => {
    //     //사업장 존재 여부 조회
    //     const place = await this.placeService.findOnePlaceById(createPlaceAdminDto.placeId)

    //     if (place === null) {
    //         throw new NotFoundException('NotFound WorkPlace');
    //     }

    //     //관리자 존재 여부 조회(존재하는 사업장만 받아옴)
    //     const admins = await this.authService.findListAdmin(createPlaceAdminDto.adminId);

    //     return await this.adminPlaceRepository.createPlaceAdmin(place, admins);

    // }


    createAdminPlace = async (id: number, places: number[]) => {
        const admin = this.authService.findOneAdmin(id)
    }


    /**
     * GET 관리자 사업장 조회(관리자가 관리하는 사업장 조회)
     * @param adminid 
     * @returns 
     */
    findAdminPlace = async (adminid: number): Promise<AdminPlaceDto[]> => {
        //관리자 조회
        const admin = await this.authService.findOneAdmin(adminid);

        //관리자 사업장 조회 join to place
        const places = await this.adminPlaceRepository.find({
            where: { user: admin },
            relations: {
                place: true
            }
        })
        let adminPlace: AdminPlaceDto[] = [];
        adminPlace = places.map((place, value) => {
            const item = new AdminPlaceDto();
            item.adminPlaceId = place.id;
            item.id = place.place.id;
            item.name = place.place.name;
            item.contractNum = place.place.contractNum;
            return item;
        })
        return adminPlace;
    }

    /**
     * GET 관리자 사업장 조회(사업장 관리하는 관리자 조회)
     * @param adminid 
     * @returns 
     */
    findPlaceAdmin = async (placeid: number): Promise<PlaceAdminDto[]> => {
        
        //사업장 조회
        const place = await this.placeService.findOnePlaceById(placeid)


        //관리자 사업장 조회 join to place
        const places = await this.adminPlaceRepository.find({
            where: { place: place },
            relations: {
                user: true
            }
        })

        console.log(places)
        //관리자 사업장 배열
        let placeAdmin: PlaceAdminDto[] = [];
        placeAdmin = places.map((place, value) => {
            const item = new PlaceAdminDto();
            item.placeAdminId = place.id;
            item.id = place.user.id;
            item.account = place.user.account;
            item.name = place.user.name;
            item.group = place.user.group;
            item.email = place.user.email;
            item.phone = place.user.phone;
            item.job = place.user.job;
            item.state = place.user.state;
            return item;
        })

        return placeAdmin;
    }


    /**
     * patch 관리자 사업장 수정(관리자)
     * @param adminId 
     * @param adminPlaceDto 
     */
    updateAdminPlace = async (adminId: number, adminPlaceDto: AdminPlaceDto[]) => {
        const admin = await this.authService.findOneAdmin(adminId);
        const existPlace = await this.placeService.findListExistPlace(adminPlaceDto.map(p => p.id));

        const adminPlaces = await this.findAdminPlace(adminId);
        const existAdminPlaceIdx = adminPlaces.map(p => p.id);
        const addAdminPlaces = existPlace.filter(p => !existAdminPlaceIdx.includes(p.id));


        if (addAdminPlaces.length > 0) {
            const newAdminPlaces = addAdminPlaces.map((place) =>
                this.adminPlaceRepository.create({
                    user: { id: admin.id },
                    place: { id: place.id },
                })
            )
            await this.adminPlaceRepository.save(newAdminPlaces);
        }


        const delPlaces = await this.adminPlaceRepository.find({
            where: {
                user: admin, place: {
                    id: Not(In(adminPlaceDto.map(m => m.id)))
                }
            },
            relations: { place: true }
        })

        if (delPlaces.length > 0) {
            await this.adminPlaceRepository.remove(delPlaces);
        }
    }


    /**
     * Get 사업장 관리자 전체 조회
     * @returns 
     */
    findAllPlaceAdmin = async(placeId: number):Promise<AdminPlace[]> =>{
        //사업장 검증
        const place = await this.placeService.findOnePlaceById(placeId);

        const placeAdmin = await this.adminPlaceRepository.find({
            where : {place : place}
        })

        return placeAdmin;
    }
}
