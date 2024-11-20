import { Group } from "src/group/group.entity";




export class UpdateAdminDto {
    id: number;
    name: string;
    account: string;
    password: string;
    email: string;
    phone: string;
    job: string;
    group : Group;
}