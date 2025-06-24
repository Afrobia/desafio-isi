import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeCoupons } from '../../domain/coupon-enum';
import { Delete } from '@nestjs/common';

@Entity('coupons')
export class CouponEntity {
  @PrimaryColumn('bigint', { nullable: false, unique: true })
  id: number;
  @Column()
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
  }
}
