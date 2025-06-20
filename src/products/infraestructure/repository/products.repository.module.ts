import { Module } from '@nestjs/common';
import { PRODUCT_REPO_TOKEN } from './products.repository.interface';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: PRODUCT_REPO_TOKEN,
      useClass: ProductsRepository,
    },
  ],
  controllers: [],
  exports: [PRODUCT_REPO_TOKEN],
})

export class ProductRepositoryModule {}
