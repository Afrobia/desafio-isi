import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TypeCoupons } from '../coupon-enum';

@Entity()
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
  @Column()
  max_uses: number;
  @Column()
  uses_count: number;
  @Column()
  valid_from: Date;
  @Column()
  valid_until: Date;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  deletedAt: Date;

  constructor(
    code: string,
    type: TypeCoupons,
    value: number,
    one_shot: boolean,
    max_uses: number,
    uses_count: number,
    valid_from: Date,
    valid_until: Date,
  ) {
    this.id = Date.now();
    this.code = code;
    this.type = type;
    this.value = value;
    this.one_shot = one_shot;
    this.max_uses = max_uses;
    this.uses_count = uses_count;
    this.valid_from = valid_from;
    this.valid_until = valid_until;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
  }
}
