import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from './discount.entity';
import { IDiscount } from '../domain/discount.interface';
import { Repository } from 'typeorm';

export class DiscountsRepository {
  constructor(
    @InjectRepository(DiscountEntity)
    private readonly discountRepository: Repository<DiscountEntity>,
  ) {}

  async save(productId:number, couponId: number): Promise<IDiscount> {
    const discountEntity = new DiscountEntity(
      productId,
      couponId,
    );
    return await this.discountRepository.save(discountEntity);
  }

  async findById(id: number): Promise<IDiscount | null> {
    return await this.discountRepository.findOne({
      where: { id, removedAt: null },
    });
  }

  async findAll(): Promise<IDiscount[]> {
    return await this.discountRepository.find()
  }

  async remove(id: number): Promise<void> {
    this.discountRepository.softDelete(id);
  }
}
