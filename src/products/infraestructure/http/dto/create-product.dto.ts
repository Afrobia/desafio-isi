import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length, Matches, Max, MaxLength, Min} from "class-validator";

export class CreateProductDto {
  @IsString()
  @Length(3, 100,{ message: 'Name must be between 3 and 50 characters' })
  @Matches( /^[a-zA-Z0-9\s\-_,.]+$/, { message: 'Name can only contain letters, numbers, and spaces' })
  @IsNotEmpty({ message: 'Name is required' })
  @ApiProperty()
  name: string;

  @IsString()
  @MaxLength(300)
  @ApiProperty()
  description: string;

  @IsNumber({maxDecimalPlaces: 2}, { message: 'Price must be a number with up to two decimal places' })
  @Min(0.00, { message: 'Price must be a positive number' })
  @Max(10000000.00, { message: 'Price must not exceed 10000000.00' })
  @IsNotEmpty({ message: 'Price is required' })
  @ApiProperty()
  price: number;

  @IsNumber({},{ message: 'Stock must be a number' })
  @IsNotEmpty({ message: 'Stock is required' })
  @ApiProperty()
  stock: number;
}
