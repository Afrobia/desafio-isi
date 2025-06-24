import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ProductInterface } from '../domain/product.interface';
import {
  PRODUCT_REPO_TOKEN,
  IProductsRepository,
} from './outboud-port/products.repository.interface';
import { IProductsService } from './inbound-port/products.service.interface';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(
    @Inject(PRODUCT_REPO_TOKEN)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async createProductUnregistered(
    product: ProductInterface,
  ): Promise<ProductInterface | string> {
    const { name } = product;
    await this.validateProductByName(name);
    const newProduct = await this.productsRepository.registerProduct(product);
    return newProduct;
  }

  async getProductById(id: number): Promise<ProductInterface | string> {
    const productFound = await this.productsRepository.findProductById(id);
    if (!productFound) {
      throw new ForbiddenException(`Product not found.`);
    }
    return productFound;
  }

  private async validateProductByName(
    name: string,
  ): Promise<ProductInterface | string> {
    const productFound = await this.productsRepository.findProductByName(name);
    if (productFound) {
      throw new ForbiddenException(`Product already exists.`);
    }
    return null;
  }

  public async listProducts(): Promise<ProductInterface[]> {
    return this.productsRepository.getAllProducts();
  }

  public async listProductsOutOfStock(): Promise<ProductInterface[]> {
    const allProducts = await this.productsRepository.getAllProducts();
    return allProducts.filter((product) => product.stock <= 0);
  }

  public async addProductToStock(
    id: number,
    amout: number,
  ): Promise<ProductInterface | string> {
    const productForUpdate = await this.productsRepository.findProductById(id);
    productForUpdate.stock += amout;
    productForUpdate.updatedAt = new Date();
    const updatedProduct =
      await this.productsRepository.updateProduct(productForUpdate);
    return updatedProduct;
  }

  public async removeProductFromStock(
    id: number,
    amout: number,
  ): Promise<ProductInterface | string> {
    const productForUpdate = (await this.getProductById(
      id,
    )) as ProductInterface;
    if (!this.stockIsAvailable(productForUpdate, amout)) {
      throw new ForbiddenException('Not enough stock available.');
    }
    productForUpdate.stock -= amout;
    productForUpdate.updatedAt = new Date();
    const updatedProduct =
      await this.productsRepository.updateProduct(productForUpdate);
    return updatedProduct;
  }

  private stockIsAvailable(product: ProductInterface, amount: number): boolean {
    return product.stock >= amount ? true : false;
  }
}
