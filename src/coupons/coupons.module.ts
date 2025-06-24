import { Module } from '@nestjs/common';
import { RepositoryModule } from '../db/repository.persistence.module';
import { COUPONS_SERVICE_TOKEN } from './application/coupon.service.interface';
import { CouponsService } from './application/coupons.service';
import { CouponsController } from './http/coupons.controller';
import {
  COUPONS_VALID_TOKEN,
  CouponValidate,
} from './application/validation/coupons-validation';

@Module({
  imports: [RepositoryModule],
  providers: [
    {
      provide: COUPONS_SERVICE_TOKEN,
      useClass: CouponsService,
    },
    {
      provide: COUPONS_VALID_TOKEN,
      useClass: CouponValidate,
    },
  ],
  controllers: [CouponsController],
  exports: [COUPONS_SERVICE_TOKEN],
})
export class CouponsModule {}
