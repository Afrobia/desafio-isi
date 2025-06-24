import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto {
  @IsString({ message: 'Code must be a string' })
  @Matches(/^[a-zA-Z]{5}\d{2}$/, {
    message:
      'O campo "code" deve conter 5 letras seguidas por 2 números. Ex: abcde12',
  })
  @IsNotEmpty()
  code: string;
  
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
