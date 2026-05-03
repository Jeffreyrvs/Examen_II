import { Type } from "class-transformer";
import { IsArray, IsEmail, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateOrderDetailDto } from "src/orders/dto/create-order_detail.dto";

export class CreateOrderDto {
    @IsInt()
    customer_id!: number;

    @IsNumber()
    ammount!: number;

    @IsString()
    shipping_address!: string;

    @IsString()
    order_address!: string;

    @IsEmail()
    order_email!: string;

    @IsString()
    order_status!: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderDetailDto)
    details!: CreateOrderDetailDto[];
}
