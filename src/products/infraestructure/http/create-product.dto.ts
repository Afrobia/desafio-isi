import { IsDecimal, IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {
  @IsString()
  @Length(3, 100,{ message: 'Name must be between 3 and 50 characters' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @MaxLength(200)
  description: string;

  @IsNumber({maxDecimalPlaces: 2}, { message: 'Price must be a number with up to two decimal places' })
  @IsNotEmpty({ message: 'Price is required' })
  price: number;

  @IsNumber({},{ message: 'Stock must be a number' })

  stock: number;
}