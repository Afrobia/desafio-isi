export interface IDiscount {
  productId: number;
  couponId: number;
  appliedAt?: Date;
  removedAt?: Date | null;
}
