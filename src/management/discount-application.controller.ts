import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  DISCOUNT_SERVICE_TOKEN,
  IDiscountsService,
} from './application/inbound-port/discount-service.interface';
import { IDiscount } from './domain/discount.interface';
import { Product } from 'src/products/domain/product.interface';

@Controller('products/discount')
export class DiscountApplicationController {
  constructor(
    @Inject(DISCOUNT_SERVICE_TOKEN)
    private readonly discountService: IDiscountsService,
  ) {}
  /* 
    @Post(':productId')
    async applyDiscount(@Param('productId')
        productId: number,
        @Body('couponCode')
        couponCode: string
      ): Promise< Product|string> {
        return await this.discountService.registerDiscount(productId, couponCode);
    }

    @Get()
    async getAllDiscounts(): Promise<IDiscount[]> {
        return await this.discountService.getDiscounts();
    } */
}
