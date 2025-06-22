import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TypeCoupons } from '../coupon-enum';

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
  @Column({nullable: true})
  max_uses: number;
  @Column({default: 0})
  uses_count: number;
  @Column({nullable: true})
  valid_from: Date;
  @Column({nullable: true})
  valid_until: Date;
  @Column({nullable: true})
  createdAt: Date;
  @Column({nullable: true})
  updatedAt: Date;
  @Column({nullable: true})
  deletedAt: Date;

  constructor(
    code: string,
    type: TypeCoupons,
    value: number,
    one_shot: boolean,
  ) {
    this.id = Date.now();
    this.code = code;
    this.type = type;
    this.value = value;
    this.one_shot = one_shot;
    this.max_uses = null;
    this.uses_count = 0;
    this.valid_from = null;
    this.valid_until = null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
  }
}
