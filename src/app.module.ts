import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CouponsModule } from './coupons/coupons.module';
import { DiscountManagementModule } from './discount-management/discount-management.module';


@Module({
  imports: [ProductsModule /*, CouponsModule, DiscountManagementModule */],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
