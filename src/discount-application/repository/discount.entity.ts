import { CouponEntity } from '../../coupons/infraestructure/repository/coupon.entity';
import { ProductEntity } from '../../products/infraestructure/repository/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ForeignKey,
  PrimaryColumn,
} from 'typeorm';

@Entity('product_coupon_applications')
export class DiscountEntity {
  @PrimaryColumn('bigint', { nullable: false, unique: true })
  id: number;
  @Column('bigint', { nullable: false })
  @ForeignKey(() => ProductEntity)
  productId: number;
  @Column('bigint', { nullable: false })
  @ForeignKey(() => CouponEntity)
  couponId: number;
  @CreateDateColumn({ type: 'timestamp' })
  appliedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  removedAt: Date | null;

  constructor(productId: number, couponId: number) {
    this.id = Date.now();
    this.productId = productId;
    this.couponId = couponId;
    this.appliedAt = new Date();
    this.removedAt = null;
  }
}
