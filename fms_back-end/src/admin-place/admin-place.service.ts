import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminPlaceRepository } from './admin-place.repositoy';
import { CreatePlaceAdminDto } from './dto/create-place-admin-dto';
import { AuthService } from 'src/auth/auth.service';
import { PlaceService } from 'src/place/place.service';

@Injectable()
export class AdminPlaceService {
    constructor(
        private adminPlaceRepository : AdminPlaceRepository,
        private authService : AuthService,
        private placeService : PlaceService

    ){}


    createPlaceAdmin = async (createPlaceAdminDto : CreatePlaceAdminDto) =>{
        //사업장 존재 여부 조회
        const place  = await this.placeService.findOnePlaceById(createPlaceAdminDto.placeId)
        
        if(place === null){
            throw new NotFoundException('NotFound WorkPlace');
        }

        //관리자 존재 여부 조회(존재하는 사업장만 받아옴)
        const admins = await this.authService.findListAdmin(createPlaceAdminDto.adminId);
        
        return await this.adminPlaceRepository.createPlaceAdmin(place, admins);
        
    }
}
