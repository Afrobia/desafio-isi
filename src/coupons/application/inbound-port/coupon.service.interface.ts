import { ICoupon } from '../../domain/coupon.interface';

export interface ICouponsService {
  createCoupon(coupon: ICoupon): Promise<ICoupon | string>;
  getCouponById(id: number): Promise<ICoupon | string>;
  getCouponByCode(code: string): Promise<ICoupon | string>;
  listCoupons(): Promise<ICoupon[]>;
  updateCoupon(code: string, coupon: ICoupon): Promise<ICoupon | string>;
  removeCoupon(code: string): Promise<string>;
}
export const COUPONS_SERVICE_TOKEN = Symbol();
