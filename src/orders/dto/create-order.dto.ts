import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEmail, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateOrderDetailDto } from "src/orders/dto/create-order_detail.dto";

export class CreateOrderDto {
    @ApiProperty()
    @IsInt()
    customer_id!: number;

    @ApiProperty()
    @IsNumber()
    ammount!: number;

    @ApiProperty()
    @IsString()
    shipping_address!: string;

    @ApiProperty()
    @IsString()
    order_address!: string;

    @ApiProperty()
    @IsEmail()
    order_email!: string;

    @ApiProperty()
    @IsString()
    order_status!: string;

    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderDetailDto)
    details!: CreateOrderDetailDto[];
}
