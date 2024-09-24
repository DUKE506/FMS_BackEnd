import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthRepository } from "./auth.repository";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(AuthRepository)
        private userRepository: AuthRepository
    ) {
        super({
            secretOrKey: 'JwtSecret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    //검증
    async validate(payload) {
        const { account } = payload;
        const user: User = await this.userRepository.findOne({
            select: { password : false },
            where: { account }
        });

        //실패
        if (!user) {
            throw new UnauthorizedException();
        }

        //성공
        return user;
    }
}