import { IsString } from "class-validator";

export class CreateOptionDto {
    @IsString()
    option_name!: string;
}
