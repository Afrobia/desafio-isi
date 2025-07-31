import { DiscountEntity } from '../../../discount-application/repository/discount.entity';
import { Product } from '../../../products/domain/product.interface';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity implements Product {
  @PrimaryColumn('bigint', { primary: true, unique: true, nullable: false })
  id: number;
  @Column('varchar', { length: 100 })
  name: string;
  @Column('varchar', { length: 200 })
  description: string;
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
  @Column('int')
  stock: number;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
  @OneToOne(() => DiscountEntity, (relationCoupon) => relationCoupon.couponId, { nullable: true })
  relationCoupon: DiscountEntity | null;

  constructor(name: string, description: string, price: number, stock: number) {
    this.id = Date.now();
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
    this.relationCoupon = null;
  }
}
