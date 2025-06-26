import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from '../products/infraestructure/repository/products.repository';
import { PRODUCT_REPO_TOKEN } from '../products/application/outboud-port/products.repository.interface';
import { ProductEntity } from '../products/infraestructure/repository/product.entity';
import { COUPONS_REPO_TOKEN } from '../coupons/application/outbound-port/coupon.repository.interface';
import { CouponEntity } from '../coupons/infraestructure/repository/coupon.entity';
import { CouponsRepository } from '../coupons/infraestructure/repository/coupon.repository';
import { DISCOUNT_REPOSITORY_TOKEN } from '../discount-application/application/outbound-port/discount-repository.interface';
import { DiscountsRepository } from '../discount-application/repository/discount.repository';
import { DiscountEntity } from 'src/discount-application/repository/discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CouponEntity,DiscountEntity])],
  providers: [
    {
      provide: PRODUCT_REPO_TOKEN,
      useClass: ProductsRepository,
    },
    {
      provide: COUPONS_REPO_TOKEN,
      useClass: CouponsRepository,
    },
    {
      provide: DISCOUNT_REPOSITORY_TOKEN,
      useClass: DiscountsRepository
    }
  ],
  controllers: [],
  exports: [PRODUCT_REPO_TOKEN, COUPONS_REPO_TOKEN, DISCOUNT_REPOSITORY_TOKEN]
})
export class RepositoryModule {}
