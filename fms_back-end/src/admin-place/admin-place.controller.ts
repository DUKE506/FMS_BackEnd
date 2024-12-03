import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { AdminPlaceService } from './admin-place.service';
import { CreateAdminPlaceDto } from './dto/create-admin-place.dto';
import { CreatePlaceAdminDto } from './dto/create-place-admin-dto';
import { AdminPlaceDto } from './dto/detail-admin-place.dto';

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


    @Get('/place/:placeid')
    findPlaceAdmin(
        @Param('placeid', ParseIntPipe) placeid: number
    ) {
        return this.adminPlaceService.findPlaceAdmin(placeid);
    }
}
