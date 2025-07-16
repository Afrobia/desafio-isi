import { Coupon } from '../../domain/coupon.interface';

export interface ICouponsService {
  create(coupon: Coupon): Promise<Coupon>;
  getById(id: number): Promise<Coupon>;
  getByCode(code: string): Promise<Coupon>;
  listAll(): Promise<Coupon[]>;
  restore(restoreCoupon: { code: string; valid_until: Date }): Promise<Coupon>;
  delete(code: string): Promise<{message:string}>;
}
export const COUPONS_SERVICE_TOKEN = Symbol();
