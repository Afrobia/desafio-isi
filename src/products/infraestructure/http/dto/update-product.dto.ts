import { IsNumber, IsOptional } from "class-validator";

export class UpdateProductDto {

  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  price: number;
  
  @IsNumber()
  @IsOptional()
  stock: number;
}