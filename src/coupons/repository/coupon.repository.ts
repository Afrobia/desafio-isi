import { ICouponsRepository } from '../application/coupon.repository.interface';
import { CouponEntity } from './coupon.entity';
import { Repository } from 'typeorm';
import { ICoupon } from '../domain/coupon.interface';
import { InjectRepository } from '@nestjs/typeorm';

export class CouponsRepository implements ICouponsRepository{
  private readonly coupons = new Map<string, CouponEntity>();

  constructor(
    @InjectRepository(CouponEntity)
    private readonly couponsRepository: Repository<CouponEntity>,
  ) {}
  restoureCoupon(code: string): Promise<ICoupon | null> {
    throw new Error('Method not implemented.');
  }

  private getAttributesCoupon(coupon: ICoupon): ICoupon {
    return {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      one_shot: coupon.one_shot,
      max_uses: coupon.max_uses,
      valid_from: coupon.valid_from,
      valid_until: coupon.valid_until,
    };
  }

  async registerCoupon(coupon: ICoupon): Promise<ICoupon | null> {
    const { code, type, value, one_shot,valid_until } = this.getAttributesCoupon(coupon);
    const newCoupon = new CouponEntity(code, type, value, one_shot, valid_until);
    newCoupon.max_uses = this.couponIsOneShot(newCoupon).max_uses;
    await this.couponsRepository.save(newCoupon);
    return newCoupon;
  }

  private couponIsOneShot(coupon: CouponEntity): CouponEntity {
    const { one_shot } = coupon;
    one_shot ? (coupon.max_uses = 1) : (coupon.max_uses = null);
    return coupon;
  }

  private async couponMap(coupon: CouponEntity): Promise<ICoupon> {
    const {
      id,
      code,
      type,
      value,
      one_shot,
      max_uses,
      uses_count,
      valid_until,
    } = coupon;
    const newCoupon = new CouponEntity(code, type, value, one_shot, valid_until);
    newCoupon.id = id;
    newCoupon.max_uses = max_uses;
    newCoupon.uses_count = uses_count;
    newCoupon.valid_from = coupon.valid_from;
    newCoupon.valid_until = valid_until;
    newCoupon.createdAt = coupon.createdAt;
    newCoupon.updatedAt = coupon.updatedAt;
    newCoupon.deletedAt = coupon.deletedAt;
    return newCoupon;
  }

  async findCouponByCode(couponCode: string): Promise<ICoupon | null> {
    const couponFound = await this.couponsRepository.findOneBy({ code : couponCode});
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
  
  private updateDeletedAt(coupon: CouponEntity): CouponEntity {
    const { uses_count, max_uses} = coupon;
    uses_count == max_uses? coupon.deletedAt = new Date() : coupon.deletedAt = null;

    return coupon;
  }


  async updateCoupon(coupon: CouponEntity): Promise<ICoupon | null> {
    const updatedCoupon = await this.couponsRepository.update(
      { code: coupon.code }, 
      {
        max_uses: coupon.max_uses,
        valid_until: coupon.valid_until,
        updatedAt: new Date(),
        deletedAt: this.updateDeletedAt(coupon).deletedAt,
      },)
      
    return updatedCoupon.affected > 0 ? coupon : null;
  }

  async deleteCoupon(coupon: CouponEntity): Promise<CouponEntity | null> {
    const deletedCoupon = await this.couponsRepository.softDelete({
      code: coupon.code})
    return deletedCoupon.affected > 0 ? coupon : null;
  }
}
