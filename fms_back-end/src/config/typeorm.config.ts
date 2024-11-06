import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig = async(
    configService : ConfigService,
):Promise<TypeOrmModuleOptions> => {
    return{
        type: "postgres",
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: parseInt(configService.get<string>('DB_PORT')) || 5432,
        username:  configService.get<string>('DB_USERNAME') ||'postgres',
        password:  configService.get<string>('DB_PASSWORD') ||'stecdev1234!',
        database:  configService.get<string>('DB_DATABASE') ||'fms',
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE') || true
    }
    
}