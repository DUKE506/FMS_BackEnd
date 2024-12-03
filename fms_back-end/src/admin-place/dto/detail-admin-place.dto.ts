import { Group } from "src/group/group.entity";




export class AdminPlaceDto {
    adminPlaceId: number;
    id: number;
    name: string;
    contractNum: string;
}

//사업장 페이지 담당 관리자 조회 dto
export class PlaceAdminDto{
    //adminplace 테이블 id
    placeAdminId: number;
    //관리자 id
    id : number;
    account : string;
    name : string;
    group : Group;
    email : string;
    phone : string;
    job : string;
    state : string | null;
}