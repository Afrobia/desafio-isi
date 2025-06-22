import { ICoupon } from '../coupon.interface';
import { ICouponService } from './coupon.service.interface';

export class CouponsService implements ICouponService {
  createCoupon(coupon: ICoupon): Promise<ICoupon | string> {
    throw new Error('Method not implemented.');
  }
  getCouponById(id: number): Promise<ICoupon | string> {
    throw new Error('Method not implemented.');
  }
  getCouponByCode(code: string): Promise<ICoupon | string> {
    throw new Error('Method not implemented.');
  }
  listCoupons(): Promise<ICoupon[]> {
    throw new Error('Method not implemented.');
  }
  updateCoupon(coupon: ICoupon): Promise<ICoupon | string> {
    throw new Error('Method not implemented.');
  }
  applyCoupon(code: string, orderTotal: number): Promise<number | string> {
    throw new Error('Method not implemented.');
  }
  removeCoupon(id: number): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
