import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeCoupons } from '../../domain/coupon-enum';
import { ProductEntity } from '../../../products/infraestructure/repository/product.entity';
import { Coupon } from '../../../coupons/domain/coupon.interface';

@Entity('coupons')
export class CouponEntity implements Coupon {
  @PrimaryColumn('bigint', { nullable: false, unique: true })
  id: number;
  @Column({ nullable: false, unique: true })
  code: string;
  @Column()
  type: TypeCoupons;
  @Column()
  value: number;
  @Column()
  one_shot: boolean;
  @Column({ nullable: true })
  max_uses: number;
  @Column({ default: 0 })
  uses_count: number;
  @Column({ nullable: true })
  valid_from: Date;
  @Column({ nullable: true })
  valid_until: Date;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
  @OneToOne(() => ProductEntity, (product) => product.coupons, {
    cascade: false,
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: ProductEntity | null;

  constructor(
    code: string,
    type: TypeCoupons,
    value: number,
    one_shot: boolean,
    valid_until: Date,
  ) {
    this.id = Date.now();
    this.code = code;
    this.type = type;
    this.value = value;
    this.one_shot = one_shot;
    this.max_uses = null;
    this.uses_count = 0;
    this.valid_from = new Date();
    this.valid_until = valid_until;
    this.createdAt;
    this.updatedAt;
    this.deletedAt = null;
    this.product = null;
  }
}
