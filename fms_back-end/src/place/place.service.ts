import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PlaceRespository } from './place.repository';
import { NotFoundError } from 'rxjs';
import { Place } from './place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { TablePlaceDto } from './dto/table-place.dto';

@Injectable()
export class PlaceService {
    constructor(
        private placeRepository: PlaceRespository
    ) { }


    //사업장 단일 조회(id)
    findOnePlaceById = async (id: number): Promise<Place> => {
        const place = await this.placeRepository.findOne({
            where: { id, deleteYn: false }
        })

        if (!place) {
            throw new NotFoundException(`${id} is not Found`);
        }

        return place
    }

    /**
     * GET 사업장 단일 조회(code)
     * @param code 
     * @returns 
     */
    findOnePlaceByCode = async (code: string): Promise<Place> => {
        const place = await this.placeRepository.findOne({
            where: { code, deleteYn: false }
        })
        return place
    }

    /**
     * GET 사업장 전체 조회
     * @returns 
     */
    findAllPlace = async (): Promise<Place[]> => {
        return await this.placeRepository.find({
            where: { deleteYn: false }
        });
    }

    /**
     * GET 사업장 전체 조회(테이블 데이터)
     * @returns TablePlaceDto
     */
    findAllPlaceTable = async ():Promise<TablePlaceDto[]> => {
        const tablePlaces = await this.placeRepository.find({
            select : ['id', 'code', 'name', 'addr', 'tel', 'contractNum', 'contractedAt', 'state']
        })

        return tablePlaces;
    }

    /**
     * POST 사업장 생성
     * @param createPlaceDto 
     * @returns 
     */
    createPlace = async (createPlaceDto: CreatePlaceDto): Promise<Place> => {

        const place = await this.findOnePlaceByCode(createPlaceDto.code)

        if (place) {
            throw new ConflictException(`Place with code ${createPlaceDto.code}`);
        }

        try {
            const placeData = {
                ...createPlaceDto,
                state: true,
                createedAt: new Date(),
                // createdUser : 추후 추가 예정
            }
            return await this.placeRepository.createPlace(placeData);
        } catch (err) {
            throw new InternalServerErrorException('사업장 생성 중 오류가 발생했습니다.' + err);
        }
    }


    deletePlaceById = async (id: number): Promise<boolean> => {
        try {
            const place = await this.findOnePlaceById(id);

            place.updatedAt = new Date();
            place.deletedAt = new Date();
            place.deleteYn = true;

            await this.placeRepository.save(place);
            return true
        } catch (err) {
            throw new Error('사업장 삭제 에러 발생');
        }

    }
}
