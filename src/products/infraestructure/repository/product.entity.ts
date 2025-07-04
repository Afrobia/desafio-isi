import { UpdateCouponsDto } from 'src/coupons/infraestructure/http/dto/update-coupons.dto';
import { CouponEntity } from 'src/coupons/infraestructure/repository/coupon.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
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
  @OneToOne(() => CouponEntity, coupon => coupon.product, {
    cascade: false})
  @JoinColumn({ name: 'coupon_id', referencedColumnName: 'id' })
  coupons: CouponEntity | null;

 

  constructor(name: string, description: string, price: number, stock: number) {
    this.id = Date.now();
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
    this.coupons = null;
  }

  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }
}
