



export class ListPlaceDto {
    id: number;
    name : string;
    contractNum : string;
}

export class AdminPlaceListDto extends ListPlaceDto{
    adminPlaceId:number;
}