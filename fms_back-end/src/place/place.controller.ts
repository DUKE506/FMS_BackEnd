import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { PlaceService } from './place.service';
import { Place } from './place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { TablePlaceDto } from './dto/table-place.dto';
import { UpdatePlaceDTO } from './dto/update-place.dto';
import { UpdateResult } from 'typeorm';

@Controller('place')
export class PlaceController {
    constructor(private placeService: PlaceService) { }

    /**
     * GET 사업장 전체조회(테이블 형태)
     * @returns 
     */
    @Get('/table')
    async findAllPlaceTable(): Promise<TablePlaceDto[]> {
        console.log("1")
        return await this.placeService.findAllPlaceTable();
    }

    /**
     * GET 사업장 단일 조회(ID)
     * @param id 
     * @returns 
     */
    @Get('/:id')
    async findOnePlace(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Place> {
        console.log("2")
        return this.placeService.findOnePlaceById(id);
    }

    /**
     * GET 사업장 전체 조회
     * @returns 
     */
    @Get()
    async findAllPlace(): Promise<Place[]> {
        console.log("3")
        return await this.placeService.findAllPlace();
    }


    /**
     * POST 사업장 생성
     * @param createPlaceDto 
     * @returns 
     */
    @Post()
    async createPlace(
        @Body() createPlaceDto: CreatePlaceDto
    ): Promise<Place> {
        console.log("4")
        return await this.placeService.createPlace(createPlaceDto);
    }


    @Patch('/:id')
    async updatePlace(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePlaceDto : UpdatePlaceDTO
    ):Promise<UpdateResult>{
        console.log(id)
        return await this.placeService.updatePlace(id,updatePlaceDto);
    }

    @Patch()
    async deletePlace(
        @Body('id', ParseIntPipe) id: number,
    ): Promise<boolean> {
        console.log("5")
        return await this.placeService.deletePlaceById(id);
    }

}
