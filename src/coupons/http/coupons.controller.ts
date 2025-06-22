import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { COUPONS_SERVICE_TOKEN, ICouponService } from '../application/coupon.service.interface';
import { CreateCouponsDto } from './create-coupons.dto';
import { ICoupon } from '../coupon.interface';

@Controller('coupons')
export class CouponsController {
    constructor(@Inject(COUPONS_SERVICE_TOKEN) private readonly couponsService: ICouponService) {}

    @Post()
    async createCoupon(@Body() coupon: CreateCouponsDto): Promise<ICoupon | string> {
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
}
