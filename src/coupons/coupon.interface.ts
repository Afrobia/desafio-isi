import { TypeCoupons } from "./coupon-enum";

export interface ICoupon {
    id:number;
    code:string;
    type: TypeCoupons;
    value:number;
    one_shot:boolean;
    max_uses:number;
    uses_count:number;
    valid_from: Date;
    valid_until: Date;
}

