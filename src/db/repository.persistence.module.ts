import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from '../products/infraestructure/repository/products.repository';
import { PRODUCT_REPO_TOKEN } from '../products/application/outboud-port/products.repository.interface';
import { ProductEntity } from '../products/infraestructure/repository/product.entity';
import { COUPONS_REPO_TOKEN } from '../coupons/application/coupon.repository.interface';
import { CouponEntity } from '../coupons/repository/coupon.entity';
import { CouponsRepository } from '../coupons/repository/coupon.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CouponEntity])],
  providers: [
    {
      provide: PRODUCT_REPO_TOKEN,
      useClass: ProductsRepository,
    },
    {
      provide: COUPONS_REPO_TOKEN,
      useClass: CouponsRepository,
    },
  ],
  controllers: [],
  exports: [PRODUCT_REPO_TOKEN, COUPONS_REPO_TOKEN],
})
export class RepositoryModule {}
