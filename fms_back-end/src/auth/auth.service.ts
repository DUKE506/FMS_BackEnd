import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { SignInUserDto } from './dto/signIn-user.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ListAdminDto } from './dto/list-admin.dto';
import { EntityManager, In, TransactionNotStartedError } from 'typeorm';
import { AdminPlaceRepository } from 'src/admin-place/admin-place.repositoy';
import { PlaceService } from 'src/place/place.service';
import { DetailAdmin } from './dto/detail-admin.dto';
import { AdminPlaceListDto } from 'src/place/dto/list-place.dto';
import { UpdateAdminDto } from './dto/update-place.dto';
import { GroupService } from 'src/group/group.service';
import { ResUser } from './dto/res-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private adminPlaceRepository: AdminPlaceRepository,
        private groupService : GroupService,
        private placeService: PlaceService,
        private jwtService: JwtService,
    ) { }

    signUp = async (createUserDto: CreateUserDto): Promise<void> => {
        try {
            return await this.userRepository.createUser(createUserDto);
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * POST 로그인
     * @param signInUserDto 
     * @returns 
     */
    signIn = async (signInUserDto: SignInUserDto): Promise<{ accessToken: string,user : ResUser }> => {
        try {
            const { account, password } = signInUserDto;

            //계정이 존재하는지 조회
            const user = await this.userRepository.findOne({
                where: { account: account },
            })
            
            //비밀번호 검증
            if (!user || !(await bcrypt.compare(password, (await user).password))) {

                throw new UnauthorizedException('Login Failed..')
            }


            const payload = { account, user: user.name };
            const accessToken = await this.jwtService.sign(payload);
            const userInfo:ResUser = {
                id : user.id,
                account : user.account,
                name : user.name,
                email : user.email,
                phone : user.phone,
                role : user.adminYn ? 'admin' : 'user'
            }
            return { accessToken, user:userInfo }
        } catch (err) {
            console.log("[ERROR] [AUTH] [SERVICE] 로그인 에러");
            console.log(err)
        }
    }

    /**
     * GET 관리자 상세페이지 조회
     * @param id 
     * @returns 
     */
    findDetailAdmin = async (id: number): Promise<DetailAdmin> => {
        const admin = await this.userRepository.findOne({
            where: {
                id,
                adminYn: true
            },
            relations: {
                adminplaces: {
                    place: true
                },
            },
            select: {
                adminplaces: {
                    id: true,
                    place: {
                        id: true,
                        name: true,
                        contractNum: true
                    }
                }
            }
        })

        const detailAdmin = new DetailAdmin();
        detailAdmin.admin = admin;
        detailAdmin.places = admin.adminplaces.map(adminPlace => {
            const adminPlaceList = new AdminPlaceListDto();
            adminPlaceList.adminPlaceId = adminPlace.id;
            adminPlaceList.id = adminPlace.place.id;
            adminPlaceList.name = adminPlace.place.name;
            adminPlaceList.contractNum = adminPlace.place.contractNum;
            return adminPlaceList;
        })

        if (admin === null) {
            throw new NotFoundException('NotFound admin');
        }

        return detailAdmin;
    }


    /**
     * 관리자 단일 조회
     * @param id 
     * @returns 
     */
    findOneAdmin = async (id: number): Promise<User> => {
        const admin = await this.userRepository.findOne({
            where: { id },
            relations: { adminplaces: true , group:true},
        })

        if (!admin) {
            throw new NotFoundException("Not exist Admin");
        }
        return admin;
    }


    /**
     * 사용자 전체 조회
     * @returns 
     */
    findAllAdminList = async (): Promise<ListAdminDto[]> => {
        const listAdminDto = await this.userRepository.find({
            select: ['id', 'account', 'password', 'name', 'email', 'phone','job'],
            where: { adminYn: true },
            relations : {group:true}
        })

        return listAdminDto;
    }

    /**
     * POST 관리자 생성
     * --
     * @param createAdminDto 
     * @returns 
     */
    createAdmin = async (createAdminDto: CreateAdminDto, TransactionManager: EntityManager):Promise<User> => {
        const { account, password, name, email, phone,group } = createAdminDto;
        
        const adminExist = await this.userRepository.findOne({
            where: { account },
        })

        if (adminExist !== null) {
            throw new ConflictException(`${account} is already exists`)
        }

        const adminGroup = await this.groupService.findOneGroupId(group);
        if(!adminGroup){
            throw new NotFoundException("존재하지 않는 그룹입니다.");
        }
        

        const placesExist = await this.placeService.findListExistPlace(createAdminDto.place);
        
        
        try{
            const admin = await this.userRepository.createAdmin(createAdminDto,adminGroup);
            const adminPlace = await this.adminPlaceRepository.createAdminPlace(
                placesExist,
                admin,
                TransactionManager
            );
            const saveUser = await TransactionManager.save(admin);
            
            return saveUser;
        }catch(err){
            console.error('관리자 생성 중 오류 발생:', err);
            throw new InternalServerErrorException('관리자 생성 중 오류가 발생했습니다.');

        }
    }

    /**
     * patch 관리자 수정
     * @param updateAdminDto 
     * @returns 
     */
    updateAdmin = async (updateAdminDto: UpdateAdminDto) => {
        const {id,name,account,password,email,phone,job, group } = updateAdminDto;
        
        const admin = await this.findOneAdmin(updateAdminDto.id);
        const groupExist = await this.groupService.findOneGroupId(group.id)
        if(!groupExist){
            throw new NotFoundException("존재하지 않는 그룹입니다.");
        }
        try {
            return this.userRepository.update(
                { id: admin.id}, 
                { name,account,password,email,phone,job, group : groupExist }
            )
        } catch (err) {
            throw new InternalServerErrorException('관리자 수정 중 오류가 발생했습니다.' + err);
        }
    }

    /**
     * GET 관리자 존재 여부(리스트)
     * @param adminList 
     * @returns 존재하는 값 배열 리턴
     */
    findListAdmin = async (adminList: number[]): Promise<User[]> => {
        const admins = this.userRepository.find({
            where: { id: In(adminList) },
        })
        return admins;
    }

    /**
     * GET 관리자 사업장 평균 조회
     * @returns 
     */
    findAvgAdminPlace = async ():Promise<string> => {
        const [totalAdmin, totalAdminPlace] = await Promise.all([
            this.userRepository.count(),
            this.adminPlaceRepository.count()
        ])

        return (totalAdminPlace/totalAdmin).toFixed(2);
    }

}
