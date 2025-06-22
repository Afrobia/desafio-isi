import { ForbiddenException, Inject } from '@nestjs/common';
import { COUPONS_REPO_TOKEN, ICouponsRepository } from './coupon.repository.interface';
import { ICouponService } from './coupon.service.interface';
import { ICoupon } from '../coupon.interface';

export class CouponsService implements ICouponService {

  constructor(@Inject(COUPONS_REPO_TOKEN) private readonly couponsRepository: ICouponsRepository) {}

  async createCoupon(coupon: ICoupon): Promise<ICoupon | string> {
    const { code } = coupon;
    await this.validateCouponByCode(code);
    const newCoupon = this.couponsRepository.registerCoupon(coupon);
    return newCoupon;
  }

  async getCouponById(id: number): Promise<ICoupon | string> {
    const couponFound = await this.couponsRepository.findCouponById(id);
    if (!couponFound) {
      throw new Error(`Coupon not found.`);
    }
    return couponFound;
  }

  private async validateCouponByCode(code: string): Promise<ICoupon | string> {
    const couponFound = await this.couponsRepository.findCouponByCode(code);
    if (couponFound) {
      throw new ForbiddenException(`Coupon already exists.`);
    }
    return null;
  }

  async getCouponByCode(code: string): Promise<ICoupon | string> {
    const couponFound = await this.couponsRepository.findCouponByCode(code);
    if (!couponFound) {
      throw new ForbiddenException(`Coupon not found.`);
    }
    return couponFound;
  }

  listCoupons(): Promise<ICoupon[]> {
    return this.couponsRepository.getAllCoupons();
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
