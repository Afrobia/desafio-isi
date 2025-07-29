import { Product } from '../../../products/domain/product.interface';
import { IDiscount } from '../../domain/discount.interface';

export interface IDiscountsService {
  create(
    product: Product,
    couponCode: string,
  ): Promise<IDiscount>;
  delete(discountId: number): Promise<string>;
  getAll(): Promise<IDiscount[]>;
}

export const DISCOUNT_SERVICE_TOKEN = Symbol();
