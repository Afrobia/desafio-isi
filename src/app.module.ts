import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { CouponsModule } from './coupons/coupons.module';
import { DiscountApplicationModule } from './discount-application/discount-application.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DbModule,
    ProductsModule,
    CouponsModule,
    DiscountApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
