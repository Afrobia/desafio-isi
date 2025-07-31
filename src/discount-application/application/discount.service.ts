import { Inject, Injectable } from '@nestjs/common';
import {
  DISCOUNT_REPOSITORY_TOKEN,
  IDiscountsRepository,
} from './outbound-port/discount-repository.interface';;
import { IDiscount } from '../domain/discount.interface';
import { Product } from '../../products/domain/product.interface';
import { CouponsService } from '../../coupons/application/coupons.service';

@Injectable()
export class DiscountsService {
   constructor(
    @Inject(DISCOUNT_REPOSITORY_TOKEN)
    private readonly discountRepository: IDiscountsRepository,
    private readonly couponsService: CouponsService,

  ) {}

  async create( product: Product ,couponCode: string): Promise<IDiscount> {
    const coupon = await this.couponsService.apply(couponCode);

    const newDiscount = await this.discountRepository.save({
      productId: product.id,
      couponId: coupon.id,
    });
    if (!newDiscount) {
      throw new Error('Discount could not be created.');
    }
    await this.couponsService.update(coupon);
    
    return newDiscount;
  }

  async delete(discountId: number): Promise<string> {
    await this.discountRepository.remove(discountId);
    
    const discount = await this.discountRepository.findById(discountId);
    return !discount
      ? 'Discount removed successfully'
      : 'Discount not found or already removed';
  }

  async getAll(): Promise<IDiscount[]> {
    return await this.discountRepository.findAll();
  }
  
}
