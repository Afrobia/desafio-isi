import { ForbiddenException, Inject} from '@nestjs/common';
import {
  COUPONS_REPO_TOKEN,
  ICouponsRepository,
} from '../application/outbound-port/coupon.repository.interface';
import { ICouponsService } from './inbound-port/coupon.service.interface';
import { Coupon, NewCoupon, RestoreCoupon } from '../domain/coupon.interface';
import { TypeCoupons } from '../domain/coupon-enum';


export class CouponsService implements ICouponsService {
  constructor(
    @Inject(COUPONS_REPO_TOKEN)
    private readonly couponsRepository: ICouponsRepository,
  ) {}

  async create(coupon: NewCoupon): Promise<Coupon> {
    const { code } = coupon;
    await this.isValid(coupon);
    coupon.code = this.lowCaseCode(code);
    coupon.valid_until = this.validUntil(coupon.daysToExpire);
    const newCoupon = await this.couponsRepository.register(coupon);
    if (!newCoupon) {
      throw new ForbiddenException(`Coupon could not be created.`);
    }
    return newCoupon;
  }

  validUntil(days: number): Date {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);
    return currentDate;
  }

  async isValid(coupon: NewCoupon): Promise<void> {
    const { code } = coupon;
    coupon.code = this.lowCaseCode(code);

    await Promise.all([
      this.codeIsValid(code),
      this.valueIsValid(coupon),
    ]);
  }

  async getById(id: number): Promise<Coupon> {
    const couponFound = await this.couponsRepository.findById(id);
    if (!couponFound) {
      throw new Error(`Coupon not found.`);
    }
    return couponFound;
  }
  
  async getByCode(code: string): Promise<Coupon> {
    const couponFound = await this.couponsRepository.findByCode(code);
    if (!couponFound) {
      throw new ForbiddenException(`Coupon not found.`);
    }
    return couponFound;
  }

  async codeIsValid(code: string): Promise<void> {
    const couponFound = await this.couponsRepository.findByCode(code);
    if (couponFound) {
      throw new ForbiddenException(`Coupon already exists.`);
    }
    return null;
  }

  async listAll(): Promise<Coupon[]> {
    return await this.couponsRepository.getAll();
  }

  async delete(code: string): Promise<{message:string}> {
    const couponFound = await this.getByCode(code);
    await this.couponsRepository.delete(couponFound);
    const result = await this.couponsRepository.findById(couponFound.id);
    console.log(result);
    if (result) {
      throw new ForbiddenException(`Coupon could not be deleted.`);
    }
    return {message:`Coupon deleted successfully.`};
  }

  async restore(restoreCoupon: RestoreCoupon): Promise<Coupon | null> {
    const { code, daysToExpire } = restoreCoupon
    const valid_until = this.validUntil(daysToExpire);
    const couponFound = await this.couponsRepository.restore({ code: this.lowCaseCode(code), valid_until });
    if (!couponFound) {
      throw new ForbiddenException(`Coupon could not be restored.`);
    }
    return couponFound;
  }

  lowCaseCode(code: string): string {
    return code.toLowerCase();
  }

  valueIsValid(coupon: Coupon): void {
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

  async max_usesIsValid(coupon: Coupon): Promise<void> {
    const { one_shot, max_uses } = coupon;
    if (one_shot && max_uses !== 1) {
      throw new Error('One-shot coupons must have a maximum of 1 use.');
    }
  }

  async countUses(coupon: Coupon): Promise<Coupon> {
    if (coupon.uses_count >= coupon.max_uses) {
      throw new ForbiddenException(`Coupon has reached its maximum uses.`);
    }
    coupon.uses_count += 1;
    const updatedCoupon = await this.update(coupon);
    if (!updatedCoupon) {
      throw new ForbiddenException(`Coupon could not be updated.`);
    }
    return updatedCoupon
  }

  async validateDate(coupon: Coupon): Promise<void> {
    const currentDate = new Date();
    if (coupon.valid_until < currentDate) {
      throw new ForbiddenException(`Coupon is no longer valid.`);
    }
    if (coupon.valid_until.getTime() === currentDate.getTime()) {
      throw new ForbiddenException(`Coupon is no longer valid.`);
    }
  }

  async update(coupon: Coupon): Promise<Coupon> {
    return this.couponsRepository.update(coupon);
  }

  async apply(couponCode: string): Promise<Coupon> {
    const coupon = await this.getByCode(couponCode);
    await this.isValidUse(coupon);
    const couponUsed = await this.countUses(coupon);

    return couponUsed;
  }

  async isValidUse(coupon: Coupon): Promise<void> {
    await this.validateDate(coupon);
    await this.max_usesIsValid(coupon);
  }
}

