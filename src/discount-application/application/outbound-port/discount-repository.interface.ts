import { IDiscount } from '../../domain/discount.interface';

export interface IDiscountsRepository {
  save(item: IDiscount): Promise<IDiscount | null>;
  findById(id: number): Promise<IDiscount | null>;
  findAll(): Promise<IDiscount[]>;
  remove(id: number): Promise<void>;
}

export const DISCOUNT_REPOSITORY_TOKEN = Symbol();
