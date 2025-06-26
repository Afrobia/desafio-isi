import { Inject, Injectable, Type } from '@nestjs/common';
import { IDiscount } from '../domain/discount.interface';
import { IDiscountsService } from './inbound-port/discount-service.interface';
import {
  DISCOUNT_REPOSITORY_TOKEN,
  IDiscountsRepository,
} from './outbound-port/discount-repository.interface';
import { PRODUCT_SERVICE_TOKEN } from '../../products/application/inbound-port/products.service.interface';
import { ProductsService } from '../../products/application/products.service';
import { COUPONS_SERVICE_TOKEN } from '../../coupons/application/inbound-port/coupon.service.interface';
import { CouponsService } from '../../coupons/application/coupons.service';
import { ProductInterface } from '../../products/domain/product.interface';
import { ICoupon } from '../../coupons/domain/coupon.interface';


@Injectable()
export class DiscountsService implements IDiscountsService {
  constructor(
    @Inject(DISCOUNT_REPOSITORY_TOKEN)
    private readonly discountRepository: IDiscountsRepository,
    @Inject(PRODUCT_SERVICE_TOKEN)
    private readonly productService: ProductsService,
    @Inject(COUPONS_SERVICE_TOKEN)
    private readonly couponsService: CouponsService,
  ) {}

  async registerDiscount( productId: number,coupomCode: string): Promise<ProductInterface| string> {
    const product = (await this.productService.getProductById(
      productId,
    )) as ProductInterface;
    const coupon = (await this.couponsService.getCouponByCode(
      coupomCode,
    )) as ICoupon;
    product.coupon = coupon;
    console.log('Product with coupon:', product);
    console.log('Coupon:', coupon);
    if (!product || !coupon) {
      return 'Product or coupon not found';
    }

    await this.discountRepository.save(
      product.id,
      coupon.id,
    );

    return await this.productService.applyDiscountToProduct(product)
  }

  async removeDiscount(discountId: number): Promise<string> {
    await this.discountRepository.remove(discountId);
    
    const discount = await this.discountRepository.findById(discountId);
    return !discount
      ? 'Discount removed successfully'
      : 'Discount not found or already removed';
  }

  async getDiscounts(): Promise<IDiscount[]> {
    return await this.discountRepository.findAll();
  }
}
