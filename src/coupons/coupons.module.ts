import { Module } from '@nestjs/common';
import { RepositoryModule } from '../db/repository.persistence.module';
import { COUPONS_SERVICE_TOKEN } from './application/coupon.service.interface';
import { CouponsService } from './application/coupons.service';

@Module({
  imports: [RepositoryModule],
  providers: [
    {
      provide: COUPONS_SERVICE_TOKEN,
      useClass: CouponsService,
    },
  ],
  controllers: [],
  exports: [COUPONS_SERVICE_TOKEN],
})
export class CouponsModule {}
