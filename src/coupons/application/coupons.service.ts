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
    coupon.code = this.lowCaseCode(code);
    await this.isValid(coupon);
    const newCoupon = await this.couponsRepository.register(coupon);
    if (!newCoupon) {
      throw new ForbiddenException(`Coupon could not be created.`);
    }
    return newCoupon;
  }

  async isValid(coupon: Coupon): Promise<void> {
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
    const { code, valid_until } = restoreCoupon
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

  max_usesIsValid(coupon: Coupon): void {
    const { one_shot, max_uses } = coupon;
    if (one_shot && max_uses !== 1) {
      throw new Error('One-shot coupons must have a maximum of 1 use.');
    }
  }
}

 /* private async getByCodeAndValidate(
    code: string,
  ): Promise<Coupon | string> {
    const couponFound = (await this.getCouponByCode(code));
    if (couponFound.uses_count >= couponFound.max_uses) {
      throw new ForbiddenException(`Coupon has reached its maximum uses.`);
    }
    const coupomUsed = this.countUses(couponFound).then(() => {
      return this.couponsRepository.findCouponByCode(code);
    });

    return coupomUsed;
  }

  async countUses(coupon: Coupon): Promise<void> {
    await this.couponsRepository.countUses(coupon);
  }

  async update(code: string, coupon: Coupon): Promise<Coupon | string> {
    const { max_uses, valid_until } = coupon;
    let couponFound = (await this.getCouponByCode(code))

    couponFound.max_uses = max_uses;
    this.couponValidate.max_usesIsValid(couponFound);
    couponFound.valid_until = valid_until;

    const updatedCoupon =
      await this.couponsRepository.updateCoupon(couponFound);
    return updatedCoupon;
  }
*/

