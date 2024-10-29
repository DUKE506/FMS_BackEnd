import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'stecdev1234!',
    database: 'fms',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}