import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsArray, IsOptional, IsUrl, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  sku!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty()
  @IsNumber()
  weight!: number;

  @ApiProperty()
  @IsString()
  descriptions!: string;

  @ApiProperty()
  @IsUrl()
  thumbnail!: string;

  @ApiProperty()
  @IsUrl()
  image!: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  stock!: number;

  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  categoryIds!: number[];

  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  optionIds!: number[];
}
