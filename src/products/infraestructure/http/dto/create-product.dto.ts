import { IsNotEmpty, IsNumber, IsString, Length, Matches, Max, MaxLength, Min} from "class-validator";

export class CreateProductDto {
  @IsString()
  @Length(3, 100,{ message: 'Name must be between 3 and 50 characters' })
  @Matches( /^[a-zA-Z0-9\s\-_,.]+$/, { message: 'Name can only contain letters, numbers, and spaces' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @MaxLength(300)
  description: string;

  @IsNumber({maxDecimalPlaces: 2}, { message: 'Price must be a number with up to two decimal places' })
  @Min(0, { message: 'Price must be a positive number' })
  @Max(1000000, { message: 'Price must not exceed 1000000' })
  @IsNotEmpty({ message: 'Price is required' })
  price: number;

  @IsNumber({},{ message: 'Stock must be a number' })
  stock: number;
}