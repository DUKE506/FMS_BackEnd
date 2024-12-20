import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, UseInterceptors } from '@nestjs/common';
import { PlaceService } from './place.service';
import { Place } from './place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { TablePlaceDto } from './dto/table-place.dto';
import { UpdatePlaceDTO } from './dto/update-place.dto';
import { UpdateResult } from 'typeorm';
import { ListPlaceDto } from './dto/list-place.dto';
import { TransactionInterceptor } from 'src/common/transaction.interceptor';
import { TransactionManager } from 'src/common/transaction.decorator';
import { PlaceInfo } from './dto/detail-place-info.dto';
import { PlacePerm } from './dto/detail-place-perm.dto';

@Controller('place')
export class PlaceController {
    constructor(private placeService: PlaceService) { }

    
    /**
     * GET 사업장 전체조회(테이블 형태)
     * @returns 
     */
    @Get('/table')
    async findAllPlaceTable(): Promise<TablePlaceDto[]> {
        return await this.placeService.findAllPlaceTable();
    }


    /**
     * GET 사업장 전체 조회(리스트)
     * @returns 
     */
    @Get('/list')
    async findAllPlaceList(): Promise<ListPlaceDto[]> {
        return await this.placeService.findAllPlaceList();
    }



    /**
     * GET 사업장 전체 조회
     * @returns 
     */
    @Get()
    async findAllPlace(): Promise<Place[]> {
        return await this.placeService.findAllPlace();
    }


    /**
     * POST 사업장 생성
     * @param createPlaceDto 
     * @returns Promise<Place>
     */
    // Promise<Place>
    @Post()
    @UseInterceptors(TransactionInterceptor)
    async createPlace(
        @Body() createPlaceDto: CreatePlaceDto,
        @TransactionManager() TransactionManager,
    ): Promise<Place> {
        return await this.placeService.createPlace(createPlaceDto, TransactionManager);
    }


    // @Patch('/:id')
    // async updatePlace(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body() updatePlaceDto: UpdatePlaceDTO
    // ): Promise<UpdateResult> {
    //     return await this.placeService.updatePlace(id, updatePlaceDto);
    // }

    @Patch()
    async deletePlace(
        @Body('id', ParseIntPipe) id: number,
    ): Promise<boolean> {
        return await this.placeService.deletePlaceById(id);
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
        return this.placeService.findOnePlaceById(id);
    }

    

    /**
     * GET 사업장 정보 조회 (INFO ONLY)
     */
    @Get('/placeinfo/:placeid')
    async findPlaceInfo(
        @Param('placeid', ParseIntPipe) placeid: number
    ):Promise<PlaceInfo>{
        return this.placeService.findPlaceInfo(placeid);
    }


    /**
     * GET 사업장 권한 조회 (PERM ONLY)
     */
    @Get('/placeperm/:placeid')
    async findPlacePerm(
        @Param('placeid', ParseIntPipe) placeid: number
    ):Promise<PlacePerm>{
        return this.placeService.findPlacePerm(placeid);
    }

    /**
     * PATCH 사업장 정보 수정 (INFO ONLY)
     */
    @Patch('/placeinfo/:placeid')
    async updatePlaceInfo(
        @Param('placeid', ParseIntPipe) placeid : number,
        @Body() updatePlaceInfoDto : PlaceInfo
    ):Promise<boolean>{        
        return this.placeService.updatePlaceInfo(updatePlaceInfoDto,placeid);
    }

    /**
     * PATCH 사업장 권한 수정 (PERM ONLY)
     */
    @Patch('/placeperm/:placeid')
    async updatePlacePerm(
        @Param('placeid', ParseIntPipe) placeid : number,
        @Body() updatePlacePermDto : PlacePerm
    ):Promise<boolean>{        
        return this.placeService.updatePlacePerm(updatePlacePermDto,placeid);
    }
}
