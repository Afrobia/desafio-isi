import { Product } from 'src/products/domain/product.interface';
import { TypeCoupons } from './coupon-enum';

export interface Coupon {
  id?: number;
  code?: string;
  type?: TypeCoupons;
  value?: number;
  one_shot?: boolean;
  uses_count?: number;
  max_uses?: number;
  valid_from?: Date;
  valid_until?: Date;
  relation?: Product | null;
}

export interface NewCoupon {
  code: string;
  type: TypeCoupons;
  value: number;
  one_shot: boolean;
  daysToExpire: number;
  valid_until?: Date;
}

export interface RestoreCoupon {
  code: string;
  daysToExpire: number;
  valid_until?: Date;
}
