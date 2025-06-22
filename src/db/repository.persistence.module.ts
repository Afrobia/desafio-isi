import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from '../products/infraestructure/repository/products.repository';
import { PRODUCT_REPO_TOKEN } from '../products/infraestructure/repository/products.repository.interface';
import { ProductEntity } from '../products/infraestructure/repository/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [
    {
      provide: PRODUCT_REPO_TOKEN,
      useClass: ProductsRepository,
    },
  ],
  controllers: [],
  exports: [PRODUCT_REPO_TOKEN],
})

export class RepositoryModule {}
