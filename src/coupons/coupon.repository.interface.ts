import { ICoupon } from "./coupon.interface";

export interface ICouponRepository {
    registerCoupon(coupon: ICoupon): Promise<ICoupon>;
    findCouponByCode(code: string): Promise<ICoupon | null>;
    findCouponById(id: number): Promise<ICoupon | null>;
    getAllCoupons(): Promise<ICoupon[]>;
    updateCoupon(coupon: ICoupon): Promise<ICoupon>;
}

export const COUPON_REPO_TOKEN = Symbol();