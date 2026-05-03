import { IsString, IsNumber, IsPositive, IsArray, IsOptional, IsUrl, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  sku!: string;

  @IsString()
  name!: string;

  @IsNumber()
  @IsPositive()
  price!: number;

  @IsNumber()
  weight!: number;

  @IsString()
  descriptions!: string;

  @IsUrl()
  thumbnail!: string;

  @IsUrl()
  image!: string;

  @IsNumber()
  @Min(0)
  stock!: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  categoryIds!: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  optionIds!: number[];
}
