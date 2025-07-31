import { Module } from '@nestjs/common';
import { ProductsService } from './application/products.service';
import { ProductsController } from './infraestructure/http/products.controller';
import { PRODUCT_SERVICE_TOKEN } from '../products/application/inbound-port/products.service.interface';
import { RepositoryModule } from '../db/repository.persistence.module';
import { CouponsModule } from '../coupons/coupons.module';
import { DiscountApplicationModule } from '../discount-application/discount-application.module';

@Module({
  imports: [RepositoryModule, CouponsModule, DiscountApplicationModule],
  providers: [
    {
      provide: PRODUCT_SERVICE_TOKEN,
      useClass: ProductsService
    },
  ],
  controllers: [ProductsController],
  exports: [PRODUCT_SERVICE_TOKEN]
})
export class ProductsModule {}
