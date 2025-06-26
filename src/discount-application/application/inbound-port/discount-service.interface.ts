import { ProductInterface } from 'src/products/domain/product.interface';
import { IDiscount } from '../../domain/discount.interface';

export interface IDiscountsService {
  registerDiscount( productId: number, couponCode: string ): Promise<ProductInterface | string>;
  removeDiscount(discountId: number): Promise<string>;
  getDiscounts(): Promise<IDiscount[]>;
}

export const DISCOUNT_SERVICE_TOKEN = Symbol();
