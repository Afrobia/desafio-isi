import { Inject, Injectable } from '@nestjs/common';
import {
  DISCOUNT_REPOSITORY_TOKEN,
  IDiscountsRepository,
} from './outbound-port/discount-repository.interface';
import { PRODUCT_SERVICE_TOKEN } from '../../products/application/inbound-port/products.service.interface';
import { ProductsService } from '../../products/application/products.service';
import { COUPONS_SERVICE_TOKEN } from '../../coupons/application/inbound-port/coupon.service.interface';
import { CouponsService } from '../../coupons/application/coupons.service';

@Injectable()
export class DiscountsService {
/*   constructor(
    @Inject(DISCOUNT_REPOSITORY_TOKEN)
    private readonly discountRepository: IDiscountsRepository,
    @Inject(PRODUCT_SERVICE_TOKEN)
    private readonly productService: ProductsService,
    @Inject(COUPONS_SERVICE_TOKEN)
    private readonly couponsService: CouponsService,
  ) {} */
  /* 
  async registerDiscount( productId: number,coupomCode: string): Promise<Product| string> {
    const product = (await this.productService.getProductById(
      productId,
    )) as Product;
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

   async applyDiscountToProduct(
    product: Product,
  ): Promise<Product> {
    const coupon = product.coupon;
    let finalPrice = 0;

    const { value, type } = coupon;
    if (type == 'percent') {
      const discount = product.price * (value / 100);
      finalPrice = product.price - discount;
    } else {
      finalPrice = product.price - value;
    }

    product.finalPrice = this.validatePrice(finalPrice) as number;
    product.discount = {
      type: coupon.type,
      value: coupon.value,
      appliedAt: new Date(),
    };

    return product;
  }

  private validatePrice(value: number): string | number {
    if (value < 0.01) {
      throw new ForbiddenException('Discount value must be greater than 0.01');
    }
    return value;
  }
     */
}