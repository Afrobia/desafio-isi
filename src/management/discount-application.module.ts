import { Module } from '@nestjs/common';
import { DiscountsService } from './application/discount.service';
import { RepositoryModule } from '../db/repository.persistence.module';
import { ProductsModule } from '../products/products.module';
import { CouponsModule } from '../coupons/coupons.module';
import { DISCOUNT_SERVICE_TOKEN } from './application/inbound-port/discount-service.interface';
import { DiscountApplicationController } from './discount-application.controller';

@Module({
  imports: [RepositoryModule,ProductsModule,CouponsModule],
  providers: [{
    provide: DISCOUNT_SERVICE_TOKEN,
    useClass: DiscountsService,
  }],
  exports: [DISCOUNT_SERVICE_TOKEN],
  controllers: [DiscountApplicationController],
})
export class DiscountApplicationModule{}
