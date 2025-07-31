import { Coupon } from "../../coupons/domain/coupon.interface";

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  finalPrice?: number;
  discount?: {};
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  coupon?: Coupon | null;
}
