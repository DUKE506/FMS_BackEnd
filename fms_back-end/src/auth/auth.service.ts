import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { SignInUserDto } from './dto/signIn-user.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ListAdminDto } from './dto/list-admin.dto';
import { EntityManager, In } from 'typeorm';
import { AdminPlaceRepository } from 'src/admin-place/admin-place.repositoy';
import { PlaceService } from 'src/place/place.service';
import { DetailAdmin } from './dto/detail-admin.dto';
import { AdminPlaceListDto } from 'src/place/dto/list-place.dto';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private adminPlaceRepository : AdminPlaceRepository,
        private placeService : PlaceService,
        private jwtService: JwtService,
    ) { }

    signUp = async (createUserDto: CreateUserDto): Promise<void> => {
        try {
            return await this.userRepository.createUser(createUserDto);
        } catch (error) {
            console.log(error)
        }
    }


    signIn = async (signInUserDto: SignInUserDto): Promise<{ accessToken: string }> => {
        try {
            const { account, password } = signInUserDto;
            const user = await this.userRepository.findOne({
                where: { account },
            })
            if (!user || (await bcrypt.compare(password, (await user).password))) {
                throw new UnauthorizedException('Login Failed..')
            }


            const payload = { account, user: user.name };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken }
        } catch (err) {
            console.log("[ERROR] [AUTH] [SERVICE] 로그인 에러");
        }
    }

    /**
     * GET 관리자 단일 조회
     * @param id 
     * @returns 
     */
    findOndAdmin = async (id: number): Promise<DetailAdmin> => {
        const admin = await this.userRepository.findOne({
            where: {
                id,
                adminYn: true
            },
            relations:{
                adminplaces : {
                    place : true
                }, 
            },
            select: {
                adminplaces:{
                    id:true,
                    place:{
                        id:true,
                        name:true,
                        contractNum:true
                    }
                }
            }
        })
        
        const detailAdmin = new DetailAdmin();
        detailAdmin.admin = admin;
        detailAdmin.places = admin.adminplaces.map(adminPlace =>{
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
     * 사용자 전체 조회
     * @returns 
     */
    findAllAdminList = async (): Promise<ListAdminDto[]> => {
        const listAdminDto = await this.userRepository.find({
            select: ['id', 'account', 'password', 'name', 'email', 'phone'],
            where: { adminYn: true },
        })

        return listAdminDto;
    }

    /**
     * POST 관리자 생성
     * --
     * @param createAdminDto 
     * @returns 
     */
    createAdmin = async (createAdminDto: CreateAdminDto, TransactionManager : EntityManager) => {
        const { account, password, name, email, phone } = createAdminDto;
        
        console.log("관리자 생성", createAdminDto);
        const adminExist = await this.userRepository.findOne({
            where: { account },
        })
        console.log("관리자 존재여부",adminExist);
        if (adminExist !== null) {
            throw new ConflictException(`${account} is already exists`)
        }
        const placesExist = await this.placeService.findListExistPlace(createAdminDto.place);
        console.log("사업장 존재여부",  placesExist);

        const admin = await this.userRepository.createAdmin(createAdminDto);
        const saveUser = await TransactionManager.save(admin);
        

        const adminPlace = await this.adminPlaceRepository.createAdminPlace(placesExist, admin, TransactionManager);
        
        return ;
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

}
