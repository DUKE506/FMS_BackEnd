import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, concatMap, finalize, Observable, tap, throwError } from "rxjs";
import { DataSource } from "typeorm";



@Injectable()
export class TransactionInterceptor implements NestInterceptor{
    constructor(private readonly dataSource : DataSource){}

    //NsetInterceptor의 구현채
    async intercept(context: ExecutionContext, next: CallHandler<any>)
    : Promise<Observable<any>> {
        //쿼리러너 시작
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        //request객체
        const req = context.switchToHttp().getRequest();
        req.queryRunnerManager = queryRunner.manager;

        return next.handle().pipe(
            // tap(async() => {
            //     await queryRunner.commitTransaction();
            //     await queryRunner.release();
            // }),
            catchError(async (e) => {
                await queryRunner.rollbackTransaction();                
                await queryRunner.release();

                return throwError(()=>e);
            }),
            finalize(async () => {
                await queryRunner.commitTransaction(); // commit 또는 rollback 후 해제
                await queryRunner.release(); // 완료 후 해제
            })
        )

    }
    
}