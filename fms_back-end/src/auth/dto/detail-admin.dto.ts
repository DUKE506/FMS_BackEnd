import { AdminPlaceListDto } from "src/place/dto/list-place.dto";
import { User } from "../user.entity";



export class DetailAdmin{
    admin : User;
    places : AdminPlaceListDto[];
}