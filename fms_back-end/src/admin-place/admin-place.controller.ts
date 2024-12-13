import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { AdminPlaceService } from './admin-place.service';
import { CreateAdminPlaceDto } from './dto/create-admin-place.dto';
import { CreatePlaceAdminDto } from './dto/create-place-admin-dto';
import { AdminPlaceDto, PlaceAdminDto } from './dto/detail-admin-place.dto';
import { AdminPlace } from './admin-place.entity';
import { User } from 'src/auth/user.entity';

@Controller('admin-place')
export class AdminPlaceController {
    constructor(
        private adminPlaceService: AdminPlaceService
    ) { }


    // @Post()
    // createPlaceAdmin(
    //     @Body(ValidationPipe) createPlaceAdminDto: CreatePlaceAdminDto
    // ) {
    //     return this.adminPlaceService.createPlaceAdmin(createPlaceAdminDto);
    // }

    @Get('/admin/:adminid')
    findAdminPlace(
        @Param('adminid', ParseIntPipe) adminid: number
    ) {
        return this.adminPlaceService.findAdminPlace(adminid);
    }



    @Patch('/:adminid')
    updateAdminPlcae(
        @Param('adminid', ParseIntPipe) adminid: number,
        @Body() adminPlaceDto: AdminPlaceDto[]
    ) {
        return this.adminPlaceService.updateAdminPlace(adminid, adminPlaceDto);
    }

    /**
     * Get사업장 관리자 조회
     * @param placeid 
     * @returns 
     */
    @Get('/place/:placeid')
    findPlaceAdmin(
        @Param('placeid', ParseIntPipe) placeid: number
    ) {
        return this.adminPlaceService.findPlaceAdmin(placeid);
    }

    /**
     * Patch 사업장 관리자 삭제
     * @param placeId 
     * @param placeAdminDto 
     * @returns 
     */
    @Patch('/place/delete/:placeId')
    deletePlaceAdmin(
        @Param('placeId', ParseIntPipe) placeId : number,
        @Body() placeAdminDto : PlaceAdminDto[]
    ){
        return this.adminPlaceService.deletePlaceAdmin(placeAdminDto,placeId)
    }

    /**
     * Post 사업장 추가
     * @param placeId 
     * @param admin 
     * @returns 
     */
    @Post('/place/create/:placeId')
    AddPlaceAdmin(
        @Param('placeId', ParseIntPipe) placeId : number,
        @Body() admin : User[],
    ){
        return this.adminPlaceService.createPlaceAdmin(admin, placeId);
    }
}
