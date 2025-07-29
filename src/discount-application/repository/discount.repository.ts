import { InjectRepository } from '@nestjs/typeorm';
import { IDiscount } from '../domain/discount.interface';
import { Repository } from 'typeorm';
import { DiscountEntity } from './discount.entity';

export class DiscountsRepository {
  constructor(
    @InjectRepository(DiscountEntity)
    private readonly discountRepository: Repository<DiscountEntity>,
  ) {}

  async save(discount: IDiscount): Promise<IDiscount | null> {
    const discountEntity = new DiscountEntity(discount.productId, discount.couponId);
 
    const newDiscount = await this.discountRepository.save(discountEntity);
    if (!newDiscount) {
      return null;
    }
    return this.mappingToDomain(newDiscount);
  }

  async mappingToDomain(discountEntity: DiscountEntity): Promise<IDiscount> {
    return {
      productId: discountEntity.productId,
      couponId: discountEntity.couponId,
      appliedAt: discountEntity.appliedAt,
    };
  }

  async findById(id: number): Promise<IDiscount | null> {
    const discountEntity = await this.discountRepository.findOne({
      where: { id, removedAt: null },
    });
    if (!discountEntity) {
      return null;
    }
    return this.mappingToDomain(discountEntity);
  }

  async findAll(): Promise<IDiscount[]> {
    const discountEntities = await this.discountRepository.find();
    return Promise.all(discountEntities.map(entity => this.mappingToDomain(entity)));
  }

  async remove(id: number): Promise<void> {
    this.discountRepository.softDelete(id);
  }
}
