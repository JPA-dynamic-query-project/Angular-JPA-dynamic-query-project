export class SearchCarRequest {
    name?: string;
    brand?: string;
    color?: string;
    startDate?: Date
    endDate?: Date
    pageNo!: number;
    pageSize!: number;
    field!: string;
    direction!: string;
    constructor(){}
}
