import { IDiscount } from "../../../discount-application/domain/discount.interface";


export interface IDiscountsRepository {
  save(productId:number,couponId: number):Promise<IDiscount|null>;
  findById(id: number): Promise<IDiscount | null>;
  findAll(): Promise<IDiscount[]>;
  remove(id: number): Promise<void>;
}

export const DISCOUNT_REPOSITORY_TOKEN = Symbol();
