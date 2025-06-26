import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { DISCOUNT_SERVICE_TOKEN, IDiscountsService } from './application/inbound-port/discount-service.interface';
import { IDiscount } from './domain/discount.interface';
import { ProductInterface } from 'src/products/domain/product.interface';

@Controller('products/discount')
export class DiscountApplicationController {
    constructor(
        @Inject(DISCOUNT_SERVICE_TOKEN)
        private readonly discountService: IDiscountsService
      ) {}

    @Post(':productId')
    async applyDiscount(@Param('productId')
        productId: number,
        @Body('couponCode')
        couponCode: string
      ): Promise< ProductInterface|string> {
        return await this.discountService.registerDiscount(productId, couponCode);
    }

    @Get()
    async getAllDiscounts(): Promise<IDiscount[]> {
        return await this.discountService.getDiscounts();
    }

}
