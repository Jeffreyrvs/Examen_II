import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty()
    @IsEmail()
    email!: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    password!: string;

    @ApiProperty()
    @IsString()
    full_name!: string;

    @ApiProperty()
    @IsString()
    billing_address!: string;

    @ApiProperty()
    @IsString()
    default_shipping_address!: string;

    @ApiProperty()
    @IsString()
    country!: string;

    @ApiProperty()
    @IsString()
    phone!: string;
}
