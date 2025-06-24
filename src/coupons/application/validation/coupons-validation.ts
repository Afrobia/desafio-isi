import { TypeCoupons } from 'src/coupons/domain/coupon-enum';
import { ICoupon } from 'src/coupons/domain/coupon.interface';

export class CouponValidate {

   lowCaseCode(code: string): string {
    return code.toLowerCase();
  }

  valueIsValid(coupon: ICoupon): void {
    const { type, value } = coupon;
    switch (type) {
      case 'percent':
        if (value < 1 || value > 80) {
          throw new Error('Percentage value must be between 0 and 80.');
        }

      case 'fixed':
        if (value < 1) {
          throw new Error('Fixed value must be greater than 0.');
        }

      default:
        if (type !== TypeCoupons.FIXED && type !== TypeCoupons.PERCENTAGE) {
          throw new Error('Invalid coupon type.');
        }
    }
  }

  max_usesIsValid(coupon: ICoupon): void {
    const { one_shot, max_uses } = coupon;
    if (one_shot && max_uses !== 1) {
      throw new Error('One-shot coupons must have a maximum of 1 use.');
    }
  }

  ifOneShot(coupon: ICoupon): ICoupon {
    const { one_shot } = coupon;
    if (one_shot) {
      coupon.max_uses = 1;
    } else {
      coupon.max_uses = null;
    }
    return coupon;
  }
}

export const COUPONS_VALID_TOKEN = Symbol()