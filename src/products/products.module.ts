import { Module } from '@nestjs/common';
import { ProductsService } from './application/products.service';
import { ProductsController } from './infraestructure/http/products.controller';
import { ProductRepositoryModule } from './infraestructure/repository/products.repository.module';
import { PRODUCT_SERVICE_TOKEN } from './application/products.service.interface';


@Module({
  imports: [ProductRepositoryModule],
  providers: [
    {
      provide: PRODUCT_SERVICE_TOKEN,
      useClass: ProductsService
    }
  ],
  controllers: [ProductsController],
  exports: [PRODUCT_SERVICE_TOKEN]
})
export class ProductsModule {}
