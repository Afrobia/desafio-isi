import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(200)
  description: string;

  @IsNumber()
  price: number;

  @IsNumber({},{ message: 'Stock must be a number' })
  stock: number;
}