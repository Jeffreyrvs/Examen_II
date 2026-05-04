import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    name!: string;

    @ApiProperty()
    @IsString()
    description!: string;

    @ApiProperty()
    @IsUrl()
    thumbnail!: string;
}
