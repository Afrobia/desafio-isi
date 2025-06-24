import { TypeCoupons } from "./coupon-enum";

export interface ICoupon {
    code?:string;
    type?: TypeCoupons;
    value?:number;
    one_shot?:boolean;
    uses_count?:number;
    max_uses?:number;
    valid_from?: Date;
    valid_until?: Date;
}

