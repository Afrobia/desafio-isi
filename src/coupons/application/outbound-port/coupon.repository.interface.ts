import { Coupon } from '../../../coupons/domain/coupon.interface';

export interface ICouponsRepository {
  register(coupon: Coupon): Promise<Coupon | null>;
  findByCode(code: string): Promise<Coupon | null>;
  findById(id: number): Promise<Coupon | null>;
  getAll(): Promise<Coupon[]>;
  update(coupon: Coupon): Promise<Coupon>;
  restore({ code, valid_until }: { code: string; valid_until: Date }): Promise<Coupon | null>;
  delete(coupon: Coupon): Promise<void>;
}

export const COUPONS_REPO_TOKEN = Symbol();
