import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  max,
} from 'class-validator';
import { TypeCoupons } from '../../../../coupons/domain/coupon-enum';

import { ApiProperty } from '@nestjs/swagger';


export class CreateCouponsDto {
  @IsString({ message: 'Code must be a string' })
  @Matches(/^[a-zA-Z]{5}\d{2}$/, {
    message:
      'O campo "code" deve conter 5 letras seguidas por 2 números. Ex: abcde12',
  })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Código do cupom de desconto',
    example: 'abcde12',
  })
  code: string;

  @IsNotEmpty()
  @ApiProperty()
  type: TypeCoupons.FIXED | TypeCoupons.PERCENTAGE;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  value: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Indica se o cupom é de uso único',
    example: true,
  })
  one_shot: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Max(30, {
    message: 'O campo "valid_until" deve ser um número entre 1 e 30',
  })
  @ApiProperty({
    description: 'Data de validade do cupom em dias',
    type: Number,
    example: 12,
  })
  daysToExpire: number;
}
