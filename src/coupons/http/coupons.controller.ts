import { Body, Controller, Inject, Post } from '@nestjs/common';
import { COUPONS_SERVICE_TOKEN, ICouponService } from '../application/coupon.service.interface';
import { CreateCouponsDto } from './create-coupons.dto';
import { ICoupon } from '../coupon.interface';

@Controller('coupons')
export class CouponsController {
    constructor(@Inject(COUPONS_SERVICE_TOKEN) private readonly couponsService: ICouponService) {}

    @Post()
    async createCoupon(@Body() coupon: CreateCouponsDto): Promise<ICoupon | string> {
        console.log('Creating coupon:', coupon);
        return await this.couponsService.createCoupon(coupon);
    }
}
