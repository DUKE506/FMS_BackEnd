import { Group } from "src/group/group.entity";




export class ListAdminDto {
    id: number;
    account: string;
    name: string;
    email: string;
    phone: string;
    job:string;
    group: Group
}