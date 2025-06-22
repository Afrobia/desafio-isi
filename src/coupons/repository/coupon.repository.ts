import { ICouponsRepository } from '../application/coupon.repository.interface';
import { CouponEntity } from './coupon.entity';
import { Repository } from 'typeorm';
import { ICoupon } from '../coupon.interface';
import { InjectRepository } from '@nestjs/typeorm';

export class CouponsRepository implements ICouponsRepository {
  private readonly coupons = new Map<string, CouponEntity>();

  constructor(
    @InjectRepository(CouponEntity)
    private readonly couponsRepository: Repository<CouponEntity>,
  ) {}

  private getAttributesCoupon(coupon: ICoupon): ICoupon {
    return {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      one_shot: coupon.one_shot,
      max_uses: coupon.max_uses,
      uses_count: coupon.uses_count,
      valid_from: coupon.valid_from,
      valid_until: coupon.valid_until
    };
  }

  async registerCoupon(coupon: ICoupon): Promise<ICoupon | null> {
    const { code, type, value, one_shot} =
      this.getAttributesCoupon(coupon);
    const newCoupon = new CouponEntity(code, type, value, one_shot);
    await this.couponsRepository.save(newCoupon);
    return newCoupon;
  }

  private async couponMap(coupon: CouponEntity): Promise<ICoupon> {
    const { id, code, type, value, one_shot, max_uses, uses_count, valid_from, valid_until } = coupon;
    const newCoupon = new CouponEntity(
      code,
      type,
      value,
      one_shot,);
    newCoupon.id = id;
    newCoupon.max_uses = max_uses;
    newCoupon.uses_count = uses_count;
    newCoupon.valid_from = valid_from;
    newCoupon.valid_until = valid_until;
    newCoupon.createdAt = coupon.createdAt;
    newCoupon.updatedAt = coupon.updatedAt;
    newCoupon.deletedAt = coupon.deletedAt;
    return newCoupon;
  }

  async findCouponByCode(code: string): Promise<ICoupon | null> {
    const couponFound = await this.couponsRepository.findOne({ where: { code },})
    return !couponFound ? null : couponFound;
  }

  async findCouponById(couponId: number): Promise<ICoupon | null> {
    const couponFound = await this.couponsRepository.findOne({
      where: { id: couponId },
    });
    return !couponFound ? null : couponFound;
  }

  async getAllCoupons(): Promise<ICoupon[]> {
    const coupons = await this.couponsRepository.find();
    const couponEntities = Promise.all(
      coupons.map((coupon) => this.couponMap(coupon)),
    );
    return couponEntities;
  }

  async updateCoupon(coupon: ICoupon): Promise<ICoupon> {
    throw new Error('Method not implemented.');
  }
}
