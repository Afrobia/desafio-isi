import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {
  COUPONS_SERVICE_TOKEN,
  ICouponsService,
} from '../../application/inbound-port/coupon.service.interface';
import { Coupon } from '../../domain/coupon.interface';
import { CreateCouponsDto } from './dto/create-coupons.dto';
import { RestoreCouponsDto } from './dto/restore-coupons.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('coupons')
@ApiTags('Coupons')
export class CouponsController {
  constructor(
    @Inject(COUPONS_SERVICE_TOKEN)
    private readonly couponsService: ICouponsService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo cupom de desconto' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() coupon: CreateCouponsDto): Promise<Coupon> {
    return await this.couponsService.create(coupon);
  }

  @Get(':code')
  @ApiOperation({ summary: 'Obtém um cupom de desconto pelo código' })
  async getByCode(@Param('code') code: string): Promise<Coupon | string> {
    return await this.couponsService.getByCode(code);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os cupons de desconto' })
  async getAll(): Promise<Coupon[]> {
    return await this.couponsService.listAll();
  }

  @Post(':code/restore')
  @ApiOperation({ summary: 'Restaura um cupom de desconto' })
  async restore(
    @Param('code') code: string,
    @Body() restoreCoupon: RestoreCouponsDto
  ): Promise<Coupon> {
    const { daysToExpire } = restoreCoupon;
    return await this.couponsService.restore({ code, daysToExpire });
  }

  @Delete(':code')
  @ApiOperation({ summary: 'Deleta um cupom de desconto' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('code') code: string): Promise<{ message: string }> {
    return await this.couponsService.delete(code);
  }
}
