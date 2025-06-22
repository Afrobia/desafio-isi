import { ICoupon } from '../coupon.interface';

export interface ICouponsRepository {
  registerCoupon(coupon: ICoupon): Promise<ICoupon>;
  findCouponByCode(code: string): Promise<ICoupon | null>;
  findCouponById(id: number): Promise<ICoupon | null>;
  getAllCoupons(): Promise<ICoupon[]>;
  updateCoupon(coupon: ICoupon): Promise<ICoupon>;
}

export const COUPONS_REPO_TOKEN = Symbol();
