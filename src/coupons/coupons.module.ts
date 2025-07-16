import { Module } from '@nestjs/common';
import { RepositoryModule } from '../db/repository.persistence.module';
import { COUPONS_SERVICE_TOKEN } from './application/inbound-port/coupon.service.interface';
import { CouponsService } from './application/coupons.service';
import { CouponsController } from './infraestructure/http/coupons.controller';

@Module({
  imports: [RepositoryModule],
  providers: [
    {
      provide: COUPONS_SERVICE_TOKEN,
      useClass: CouponsService,
    }
  ],
  controllers: [CouponsController],
  exports: [COUPONS_SERVICE_TOKEN],
})

export class CouponsModule {}
