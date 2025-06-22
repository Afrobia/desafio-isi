import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TypeCoupons } from "../coupon-enum";

export class CreateCouponsDto {
    @IsString()
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
}
