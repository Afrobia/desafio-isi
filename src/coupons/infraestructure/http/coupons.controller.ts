import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  COUPONS_SERVICE_TOKEN,
  ICouponService,
} from '../../application/inbound-port/coupon.service.interface';
import { CreateCouponsDto } from './create-coupons.dto';
import { ICoupon } from '../../domain/coupon.interface';
import { UpdateCouponsDto } from './dto/update-coupons.dto';

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
  async getCouponByCode(
    @Param('code') code: string,
  ): Promise<ICoupon | string> {
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
    return await this.couponsService.updateCoupon(code, coupon);
  }

  @Delete(':code')
  async deleteCoupon(@Param('code') code: string): Promise<string> {
    return await this.couponsService.removeCoupon(code);
  }
}
