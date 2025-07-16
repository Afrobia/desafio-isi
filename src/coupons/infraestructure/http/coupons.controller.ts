import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  COUPONS_SERVICE_TOKEN,
  ICouponsService,
} from '../../application/inbound-port/coupon.service.interface';
import { Coupon } from '../../domain/coupon.interface';
import { CreateCouponsDto } from './dto/create-coupons.dto';
import { RestoreCouponsDto } from './dto/restore-coupons.dto';

@Controller('coupons')
export class CouponsController {
  constructor(
    @Inject(COUPONS_SERVICE_TOKEN)
    private readonly couponsService: ICouponsService,
  ) {}

  @Post()
  async create(
    @Body() coupon: CreateCouponsDto,
  ): Promise<Coupon> {
    return await this.couponsService.create(coupon);
  }

  @Get(':code')
  async getByCode(@Param('code') code: string): Promise<Coupon | string> {
    return await this.couponsService.getByCode(code);
  }

  @Get()
  async getAll(): Promise<Coupon[]> {
    return await this.couponsService.listAll();
  }

  @Post(':code/restore')
  async restore(@Param('code') code: string, @Body() restoreCoupon: RestoreCouponsDto): Promise<Coupon> {
    const { valid_until } = restoreCoupon;
    return await this.couponsService.restore({ code, valid_until });
  }

  @Delete(':code')
  async delete(@Param('code') code: string): Promise<{message:string}> {
    return await this.couponsService.delete(code);
  }
}
