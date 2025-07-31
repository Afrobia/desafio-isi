import { Coupon } from '../../domain/coupon.interface';

export interface ICouponsService {
  create(coupon: Coupon): Promise<Coupon>;
  getById(id: number): Promise<Coupon>;
  getByCode(code: string): Promise<Coupon>;
  update(coupon: Coupon): Promise<Coupon>;
  apply(couponCode: string): Promise<Coupon>;
  listAll(): Promise<Coupon[]>;
  restore(restoreCoupon: { code: string; daysToExpire: number }): Promise<Coupon>;
  delete(code: string): Promise<{message:string}>;
}
export const COUPONS_SERVICE_TOKEN = Symbol();
