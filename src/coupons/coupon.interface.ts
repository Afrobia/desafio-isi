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

export class CouponEntity implements ICoupon {
    id: number;
    code: string;
    type: TypeCoupons;
    value: number;
    one_shot: boolean;
    max_uses: number;
    uses_count: number;
    valid_from: Date;
    valid_until: Date;
    createdAt: Date;
    updatedAt: Date
    deletedAt: Date

    constructor(coupon: ICoupon) {
        this.id = coupon.id;
        this.code = coupon.code;
        this.type = coupon.type;
        this.value = coupon.value;
        this.one_shot = coupon.one_shot;
        this.max_uses = coupon.max_uses;
        this.uses_count = coupon.uses_count;
        this.valid_from = coupon.valid_from;
        this.valid_until = coupon.valid_until;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null
    }
}

