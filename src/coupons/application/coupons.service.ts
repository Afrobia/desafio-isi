import { ForbiddenException, Inject } from '@nestjs/common';
import {
  COUPONS_REPO_TOKEN,
  ICouponsRepository,
} from '../application/outbound-port/coupon.repository.interface';
import { ICouponService } from './inbound-port/coupon.service.interface';
import { ICoupon } from '../domain/coupon.interface';
import {
  COUPONS_VALID_TOKEN,
  CouponValidate,
} from './validation/coupons-validation';

export class CouponsService implements ICouponService {
  constructor(
    @Inject(COUPONS_REPO_TOKEN)
    private readonly couponsRepository: ICouponsRepository,
    @Inject(COUPONS_VALID_TOKEN)
    private readonly couponValidate: CouponValidate,
  ) {}

  async createCoupon(coupon: ICoupon): Promise<ICoupon | string> {
    const { code } = coupon;
    coupon.code = this.couponValidate.lowCaseCode(code);
    await this.validateCouponByCode(code);
    this.couponValidate.valueIsValid(coupon);
    coupon = this.couponValidate.ifOneShot(coupon);
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

  async validateCouponByCode(code: string): Promise<ICoupon | string> {
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

  async listCoupons(): Promise<ICoupon[]> {
    return await this.couponsRepository.getAllCoupons();
  }

  /* private async getCouponByCodeAndValidate(
    code: string,
  ): Promise<ICoupon | string> {
    const couponFound = (await this.getCouponByCode(code)) as ICoupon;
    if (couponFound.uses_count >= couponFound.max_uses) {
      throw new ForbiddenException(`Coupon has reached its maximum uses.`);
    }
    return couponFound;
  } */

  async updateCoupon(code: string, coupon: ICoupon): Promise<ICoupon | string> {
    const { max_uses, valid_until } = coupon;
    let couponFound = (await this.getCouponByCode(code)) as ICoupon;

    couponFound.max_uses = max_uses;
    this.couponValidate.max_usesIsValid(couponFound);
    couponFound.valid_until = valid_until;

    const updatedCoupon =
      await this.couponsRepository.updateCoupon(couponFound);
    return updatedCoupon;
  }

  async removeCoupon(code: string): Promise<string> {
    const couponFound = (await this.getCouponByCode(code)) as ICoupon;
    console.log(couponFound);
    const couponDeleted =
      await this.couponsRepository.deleteCoupon(couponFound);
    console.log(couponDeleted);
    return `Coupon ${couponDeleted.code} deleted successfully.`;
  }
}
