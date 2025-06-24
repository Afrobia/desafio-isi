import { Body, Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import {
  COUPONS_SERVICE_TOKEN,
  ICouponService,
} from '../application/coupon.service.interface';
import { CreateCouponsDto } from './create-coupons.dto';
import { ICoupon } from '../domain/coupon.interface';
import { UpdateCouponsDto } from './update-coupons.dto';

@Controller('coupons')
export class CouponsController {
  constructor(
    @Inject(COUPONS_SERVICE_TOKEN)
    private readonly couponsService: ICouponService,
  ) {}

  @Post()
  async createCoupon(
    @Body() coupon: CreateCouponsDto,
  ): Promise<ICoupon | string> {
    return await this.couponsService.createCoupon(coupon);
  }

  @Get(':code')
  async getCouponByCode(@Body('code') code: string): Promise<ICoupon | string> {
    return await this.couponsService.getCouponByCode(code);
  }

  @Get()
  async getAllCoupons(): Promise<ICoupon[]> {
    return await this.couponsService.listCoupons();
  }

  @Patch(':code/validate')
  async updateCoupon(
    @Param('code') code: string,
    @Body() coupon: UpdateCouponsDto,
  ): Promise<ICoupon | string> {
    
    return await this.couponsService.updateCoupon(code,coupon);
  }

}
