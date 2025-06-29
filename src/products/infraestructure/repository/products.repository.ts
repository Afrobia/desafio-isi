import { ProductInterface } from '../../../products/domain/product.interface';
import { ProductEntity } from '../../../products/infraestructure/repository/product.entity';
import { IProductsRepository } from '../../application/outboud-port/products.repository.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class ProductsRepository implements IProductsRepository { 
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  private getAtributteProduct(
    productInterface: ProductInterface,
  ): ProductInterface {
    return {
      name: productInterface.name,
      description: productInterface.description,
      price: productInterface.price,
      stock: productInterface.stock,
    };
  }

  async registerProduct(
    productModel: ProductInterface,
  ): Promise<ProductEntity> {
    const { name, description, price, stock } =
      this.getAtributteProduct(productModel);
    const newProduct = new ProductEntity(name, description, price, stock);
    this.productsRepository.save(newProduct);
    return newProduct;
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    const products = await this.productsRepository.find();
    const productEntities = Promise.all(
      products.map((product) => this.productMap(product)),
    );
    return productEntities;
  }

  private async productMap(product: ProductEntity): Promise<ProductEntity> {
    const { name, description, price, stock } = product;
    const newProduct = new ProductEntity(name, description, price, stock);
    newProduct.setId(product.getId());
    newProduct.createdAt = product.createdAt;
    newProduct.updatedAt = product.updatedAt;
    newProduct.deletedAt = product.deletedAt;
    return newProduct;
  }

  async findProductById(productId: number): Promise<ProductEntity | null> {
    const productFound = await this.productsRepository.findOne({
      where: { id: productId },relations: ['coupons'],
    });
    return !productFound ? null : productFound;
  }

  async findProductByName(name: string): Promise<ProductEntity | null> {
    const productFound = await this.productsRepository.findOne({
      where: { name },
    });
    return !productFound ? null : productFound;
  }

  async updateProduct(
    product: ProductInterface,
  ): Promise<ProductEntity | null> {
    const updatedProduct = await this.availableStockProduct(
      product as ProductEntity,
    );
    return updatedProduct ? updatedProduct : null;
  }

  async availableStockProduct(
    product: ProductEntity,
  ): Promise<ProductEntity | null> {
    product.stock == 0
      ? (product.deletedAt = new Date())
      : (product.deletedAt = null);
    return await this.productsRepository
      .update(product.id, product)
      .then(() => this.findProductById(product.id));
  }

  async getProductsUsingRelations(productid: number): Promise<ProductInterface> {
      return this.productsRepository.findOne({
      where: { id: productid },relations: ['coupons'],
    });
  }
  
  async deleteProduct(product: ProductInterface): Promise<void> {
    const productDeleted = await this.productsRepository.softDelete(product.id);
  }
  
}
