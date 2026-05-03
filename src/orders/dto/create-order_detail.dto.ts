import { IsInt, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateOrderDetailDto {
    @IsInt()
    product_id!: number;

    @IsNumber()
    @IsPositive()
    price!: number;

    @IsString()
    sku!: string;

    @IsInt()
    @IsPositive()
    quantity!: number;
}
