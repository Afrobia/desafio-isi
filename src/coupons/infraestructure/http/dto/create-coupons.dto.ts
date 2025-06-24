import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';
import { TypeCoupons } from '../../../../coupons/domain/coupon-enum';
import { Type } from 'class-transformer';

export class CreateCouponsDto {
  @IsString({ message: 'Code must be a string' })
  @Matches(/^[a-zA-Z]{5}\d{2}$/, {
    message:
      'O campo "code" deve conter 5 letras seguidas por 2 números. Ex: abcde12',
  })
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  type: TypeCoupons.FIXED | TypeCoupons.PERCENTAGE;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsBoolean()
  @IsNotEmpty()
  one_shot: boolean;

  @Type(() => Date)
  @IsDate()
  valid_until: Date;
}
