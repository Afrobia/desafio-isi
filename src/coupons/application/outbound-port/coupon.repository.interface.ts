import { ICoupon } from "../../../coupons/domain/coupon.interface";


export interface ICouponsRepository {
  registerCoupon(coupon: ICoupon): Promise<ICoupon | null>;
  findCouponByCode(code: string): Promise<ICoupon | null>;
  findCouponById(id: number): Promise<ICoupon | null>;
  getAllCoupons(): Promise<ICoupon[]>;
  updateCoupon(coupon: ICoupon): Promise<ICoupon>;
  deleteCoupon(coupon: ICoupon): Promise<ICoupon | null>;
}

export const COUPONS_REPO_TOKEN = Symbol();
