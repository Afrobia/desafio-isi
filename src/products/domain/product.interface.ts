import { ICoupon } from "src/coupons/domain/coupon.interface";

export interface ProductInterface {
    id?: number;
    name: string;
    description: string;
    price: number;
    finalPrice?: number;
    discount?: {}
    stock:number;
    updatedAt?: Date;
    coupon?: ICoupon | null;
}