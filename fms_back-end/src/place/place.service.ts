import { ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PlaceRespository } from './place.repository';
import { NotFoundError } from 'rxjs';
import { Place } from './place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { TablePlaceDto } from './dto/table-place.dto';
import { UpdatePlaceDTO } from './dto/update-place.dto';
import { ListPlaceDto } from './dto/list-place.dto';
import { EntityManager, In } from 'typeorm';
import { AdminPlaceRepository } from 'src/admin-place/admin-place.repositoy';
import { AuthService } from 'src/auth/auth.service';
import { PlaceInfo } from './dto/detail-place-info.dto';
import { PlacePerm } from './dto/detail-place-perm.dto';

@Injectable()
export class PlaceService {
    constructor(
        private placeRepository: PlaceRespository,
        private adminPlaceRepository: AdminPlaceRepository,
        @Inject(forwardRef(()=>AuthService))
        private authService : AuthService,
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
    findAllPlaceTable = async (): Promise<TablePlaceDto[]> => {
        const tablePlaces = await this.placeRepository.find({
            select: ['id', 'code', 'name', 'addr', 'tel', 'contractNum', 'contractedAt', 'state'],
            where: { deleteYn: false }
        })
        return tablePlaces;
    }

    /**
     * GET 사업장 전체 조회(리스트 / 식별자, 이름, 계약번호)
     * @returns 
     */
    findAllPlaceList = async (): Promise<ListPlaceDto[]> => {
        const listPlcaes = await this.placeRepository.find({
            select: ['id', 'name', 'contractNum'],
            where: { deleteYn: false }
        })

        return listPlcaes;
    }

    /**
     * POST 사업장 생성
     * @param createPlaceDto 
     * @returns 
     */
    createPlace = async (createPlaceDto: CreatePlaceDto, TransactionManager: EntityManager): Promise<Place> => {
        const {user, ...placeData} = createPlaceDto; 


        //사업장 중복 검사
        const place = await this.findOnePlaceByCode(createPlaceDto.code)
        
        if (place) {
            throw new ConflictException(`Place with code ${createPlaceDto.code}`);
        }
        

        //관리자 유효성 검사
        const adminExist = await this.authService.findListExistAdmin(createPlaceDto.user);
        
        try {
            const placeEntity = {
                ...placeData,
                state: true,
                deleteYn: false,
                createdAt: new Date(),
            }
            const place = await this.placeRepository.createPlace(placeEntity);
            
            
            if(adminExist){
                const placeAdmin = await this.adminPlaceRepository.createPlaceAdmin(
                    place,
                    adminExist,
                    TransactionManager
                );
            }
            
            const savePlace = await TransactionManager.save(place);
            return savePlace;
        } catch (err) {
            throw new InternalServerErrorException('사업장 생성 중 오류가 발생했습니다.' + err);
        }
    }

    /**
     * PATCH 사업장 수정
     * @param id 
     * @param updatePlaceDto 
     * @returns 
     */
    updatePlace = async (id: number, updatePlaceDto: UpdatePlaceDTO) => {
        const place = await this.findOnePlaceById(id);

        try {
            return await this.placeRepository.update({ id }, { ...updatePlaceDto })

        } catch (err) {
            throw new InternalServerErrorException('사업장 수정 중 오류가 발생했습니다.' + err);
        }
    }

    /**
     * Patch 사업장 삭제
     * --
     * @param id 
     * @returns 
     */
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

    /**
     * GET 사업장 존재 여부(리스트)
     * @param placeIdList
     * @returns 존재하는 값 배열 리턴
     */
    findListExistPlace = async (placeIdList: number[]): Promise<Place[]> => {
        const places = this.placeRepository.find({
            where: { id: In(placeIdList) },
        })
        return places;
    }

    /**
     * GET 사업장 정보 조회(INFO ONLY)
     */
    findPlaceInfo = async(placeid : number):Promise<PlaceInfo> => {
        const place = await this.findOnePlaceById(placeid);

        const placeInfo = this.placeRepository.findOne({
            where : {id : place.id},
            select : ['id','name','code','contractNum','tel','addr','detailAddr','canceledAt','contractedAt','state']
        })

        return placeInfo;
    }

    /**
     * GET 사업장 권한 조회 (PERM ONLY)
     */
    findPlacePerm = async(placeid : number):Promise<PlacePerm> => {
        const place = await this.findOnePlaceById(placeid);

        const placePerm = this.placeRepository.findOne({
            where : {id : place.id},
            select : ['machinePerm','electricPerm','liftPerm','firePerm','constructPerm','networkPerm','beautyPerm','securityPerm','energyPerm','vocPerm']
        })

        return placePerm;
    }


    /**
     * PATCH 사업장 정보 수정 (INFO ONLY)
     * @param placeinfo 
     * @param placeid 
     */
    updatePlaceInfo = async(placeinfo : PlaceInfo, placeid : number):Promise<boolean> => {
        // 사업장 유효성 검사
        const place = await this.findOnePlaceById(placeid);

        const update = await this.placeRepository.update(
            {id : place.id},
            {...placeinfo}
        )
        
        return update.affected > 0;
    }

    /**
     * PATCH 사업장 권한 수정 (PERM ONLY)
     * @param placePerm 
     * @param placeid 
     */
    updatePlacePerm = async(placePerm : PlacePerm, placeid : number):Promise<boolean> => {
        // 사업장 유효성 검사
        const place = await this.findOnePlaceById(placeid);

        const update = await this.placeRepository.update(
            {id : place.id},
            {...placePerm}
        )
        
        return update.affected > 0;
    }
}
