import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ProductInterface } from '../model/product.interface';
import {
  PRODUCT_REPO_TOKEN,
  ProductsIRepository,
} from '../infraestructure/db/products.repository.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPO_TOKEN)
    private readonly productsRepository: ProductsIRepository,
  ) {}

  async createProductIfNotExists(
    productInterface: ProductInterface,
  ): Promise<ProductInterface | string> {
    const { name } = productInterface;
    const productFound = await this.productsRepository.findProductByName(name);
    if (productFound) {
      throw new ForbiddenException(`Product with name already exists.`);
    }
    const newProduct =
      this.productsRepository.registerProduct(productInterface);
    return newProduct;
  }

  public async listProducts(): Promise<ProductInterface[]> {
    return this.productsRepository.findAllProducts();
  }

  private async getProductByName(
    name: string,
  ): Promise<ProductInterface | null> {
    const productFound = await this.productsRepository.findProductByName(name);
    if (!productFound) {
      throw new ForbiddenException(`Product with not found.`);
    }
    return productFound;
  }

  async getProductById(id: number): Promise<ProductInterface | string> {
    const productFound = await this.productsRepository.findProductById(id);
    if (!productFound) {
      throw new ForbiddenException(`Product not found.`);
    }
    return productFound;
  }
}
