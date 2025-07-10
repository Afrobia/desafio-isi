import { Product } from '../../../products/domain/product.interface';
import { ProductEntity } from '../../../products/infraestructure/repository/product.entity';
import { IProductsRepository } from '../../application/outboud-port/products.repository.interface';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class ProductsRepository implements IProductsRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  async register(productModel: Product): Promise<ProductEntity> {
    const { name, description, price, stock } = productModel;
    const newProduct = new ProductEntity(name, description, price, stock);
    this.productsRepository.save(newProduct);
    return newProduct;
  }

  async getAll(): Promise<ProductEntity[]> {
    const products = await this.productsRepository.find();
    return products;
  }

  async findById(productId: number): Promise<ProductEntity | null> {
    const productFound = await this.productsRepository.findOne({
      where: { id: productId },
      relations: ['coupons'],
    });
    return !productFound ? null : productFound;
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    const productFound = await this.productsRepository.findOne({
      where: { name },
    });
    return !productFound ? null : productFound;
  }

  async update(product: Product): Promise<ProductEntity> {
    await this.productsRepository.update(
      product.id,
      product,
    );
    
    return this.productsRepository.findOne({ where: { id: product.id } });
  }

  async delete(product: Product): Promise<void> {
    await this.productsRepository.softDelete(product.id);
  }

  async getUsingRelations(productid: number): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productid },
      relations: ['coupons'],
    });
  }
}
