import { ICouponsRepository } from '../../application/outbound-port/coupon.repository.interface';
import { CouponEntity } from './coupon.entity';
import { Repository } from 'typeorm';
import { Coupon } from '../../domain/coupon.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, ForbiddenException } from '@nestjs/common';

export class CouponsRepository implements ICouponsRepository {
  
  constructor(
    @InjectRepository(CouponEntity)
    private readonly couponsRepository: Repository<CouponEntity>,
  ) {}

  async register(coupon: Coupon): Promise<Coupon | null> {
    const { code, type, value, one_shot, valid_until } = coupon;
    await this.couponsRepository.findOne({ where: { code }, withDeleted: true }).then(existingCoupon => {
      if (existingCoupon) {
        throw new ConflictException(`Coupon with code already exists.`);
      }
    });

    const newCoupon = new CouponEntity(
      code,
      type,
      value,
      one_shot,
      valid_until,
    );
    newCoupon.max_uses = this.isOneShot(newCoupon).max_uses;
    await this.couponsRepository.save(newCoupon);
    const couponFound = await this.findByCode(code);
    if (!couponFound) {
      return null;
    }
    return newCoupon;
  }

  private isOneShot(coupon: CouponEntity): CouponEntity {
    const { one_shot } = coupon;
    one_shot ? (coupon.max_uses = 1) : (coupon.max_uses = null);
    return coupon;
  }

  async findByCode(couponCode: string): Promise<Coupon | null> {
    const couponFound = await this.couponsRepository.findOneBy({
      code: couponCode,
    });
    return !couponFound ? null : couponFound;
  }

  async findById(couponId: number): Promise<Coupon | null> {
    const couponFound = await this.couponsRepository.findOne({
      where: { id: couponId },
    });
    return !couponFound ? null : couponFound;
  }

  async getAll(): Promise<Coupon[]> {
    const coupons = await this.couponsRepository.find();

    return coupons;
  }

  async getAllWithDeleted(): Promise<Coupon[]> {
    const coupons = await this.couponsRepository.find({ withDeleted: true });
    return coupons;
  }

  async update(coupon: Coupon): Promise<Coupon | null> {
    const { id } = coupon;
    await this.couponsRepository.update({ id }, coupon);
    return await this.findById(id);
  }

  async restore(restoreCoupon: { code: string; valid_until: Date }): Promise<Coupon | null> {

    await this.couponsRepository.restore({
      code: restoreCoupon.code,
    });

    const couponFound = await this.findByCode(restoreCoupon.code);
    if (!couponFound) {
      throw new ForbiddenException(`Coupon could not be restored.`);
    }
    couponFound.valid_from = new Date();
    couponFound.valid_until = restoreCoupon.valid_until;
    couponFound.uses_count = 0;
    
    await this.update(couponFound);
    return couponFound;
  }

  async delete(coupon: Coupon): Promise<void> {
    await this.couponsRepository.softDelete({
      code: coupon.code,
    });
  }
}
