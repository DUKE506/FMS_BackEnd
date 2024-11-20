import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { SignInUserDto } from './dto/signIn-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ListAdminDto } from './dto/list-admin.dto';
import { TransactionInterceptor } from 'src/common/transaction.interceptor';
import { TransactionManager } from 'src/common/transaction.decorator';
import { UpdateAdminDto } from './dto/update-place.dto';

@Controller('auth')
export class AuthController {
    //의존성 주입
    constructor(private authService: AuthService) { };

    @Post('/signup')
    signUp(
        @Body(ValidationPipe) createUserDto: CreateUserDto
    ): Promise<void> {
        return this.authService.signUp(createUserDto);
    }

    @Post('/signin')
    signIn(
        @Body(ValidationPipe) signInUserDto: SignInUserDto
    ) {
        return this.authService.signIn(signInUserDto);
    }

    /**
     * GET 전체 관리자 조회
     * @returns 
     */
    @Get('/admin')
    async findAllAdmin(): Promise<ListAdminDto[]> {
        return await this.authService.findAllAdminList();
    }

    /**
     * GET 관리자 목록(리스트 형태)
     * @param adminList 
     * @returns 
     */
    @Get('/listadmin')
    async findListAdmin(
        @Query('adminList') adminList: number[],
    ) {
        return await this.authService.findListAdmin(adminList);
    }

    /**
     * 관리자 생성
     * @param createAdminDto 
     * @returns 
     */
    @Post('/create/admin')
    @UseInterceptors(TransactionInterceptor)
    createAdmin(
        @Body(ValidationPipe) createAdminDto: CreateAdminDto,
        @TransactionManager() TransactionManager,
    ) {
        return this.authService.createAdmin(createAdminDto, TransactionManager);
    }

    /**
     * 그룹 수정
     * @param id 
     * @param updateAdminDto 
     * @returns 
     */
    @Patch('/admin/:id')
    updateAdmin(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAdminDto: UpdateAdminDto
    ) {
        return this.authService.updateAdmin(updateAdminDto);
    }

    /**
     * GET 사용자 단일 조회
     */
    @Get('/admin/:id')
    async findOneAdmin(
        @Param('id', ParseIntPipe) id: number
    ) {
        return await this.authService.findOneAdmin(id);
    }

    @Get('/adminplace/avg')
    findAvgAdminPlace(){
        console.log('aa')
        return this.authService.findAvgAdminPlace();
    }
}
