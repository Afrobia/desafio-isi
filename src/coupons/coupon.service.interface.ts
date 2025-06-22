import { ICoupon } from "./coupon.interface";

export interface ICouponService {
  createCoupon(coupon: ICoupon): Promise<ICoupon | string>;
  getCouponById(id: number): Promise<ICoupon | string>;
  getCouponByCode(code: string): Promise<ICoupon | string>;
  listCoupons(): Promise<ICoupon[]>;
  updateCoupon(coupon: ICoupon): Promise<ICoupon | string>;
  applyCoupon(code: string, orderTotal: number): Promise<number | string>;
  removeCoupon(id: number): Promise<string>;
}
export const COUPON_SERVICE_TOKEN = Symbol();