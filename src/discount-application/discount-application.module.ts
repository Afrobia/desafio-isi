import { Module } from '@nestjs/common';
import { DiscountsService } from './application/discount.service';
import { RepositoryModule } from '../db/repository.persistence.module';
import { DISCOUNT_SERVICE_TOKEN } from './application/inbound-port/discount-service.interface';
import { CouponsService } from '../coupons/application/coupons.service';

@Module({
  imports: [RepositoryModule],
  providers: [
    {
      provide: DISCOUNT_SERVICE_TOKEN,
      useClass: DiscountsService,
    },
    CouponsService,
  ],
  exports: [DISCOUNT_SERVICE_TOKEN],
})
export class DiscountApplicationModule {}
