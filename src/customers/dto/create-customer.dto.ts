import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateCustomerDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    password!: string;

    @IsString()
    full_name!: string;

    @IsString()
    billing_address!: string;

    @IsString()
    default_shipping_address!: string;

    @IsString()
    country!: string;

    @IsString()
    phone!: string;
}
