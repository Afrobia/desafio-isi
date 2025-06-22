import { ICouponsRepository } from '../application/coupon.repository.interface';
import { CouponEntity } from './coupon.entity';
import { Repository } from 'typeorm';
import { ICoupon } from '../coupon.interface';
import { InjectRepository } from '@nestjs/typeorm';

export class CouponsRepository implements ICouponsRepository {
  private readonly coupons = new Map<string, CouponEntity>();

  constructor(
    @InjectRepository(CouponEntity)
    private readonly couponsRepository: Repository<CouponsRepository>,
  ) {}

  async registerCoupon(coupon: ICoupon): Promise<ICoupon> {
    throw new Error('Method not implemented.');
  }

  async findCouponByCode(code: string): Promise<ICoupon | null> {
    throw new Error('Method not implemented.');
  }

  async findCouponById(id: number): Promise<ICoupon | null> {
    throw new Error('Method not implemented.');
  }

  async getAllCoupons(): Promise<ICoupon[]> {
    throw new Error('Method not implemented.');
  }

  async updateCoupon(coupon: ICoupon): Promise<ICoupon> {
    throw new Error('Method not implemented.');
  }
}
