import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ProductInterface } from '../domain/product.interface';
import {
  PRODUCT_REPO_TOKEN,
  IProductsRepository,
} from '../infraestructure/repository/products.repository.interface';
import { IProductsService } from './products.service.interface';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(
    @Inject(PRODUCT_REPO_TOKEN)
    private readonly productsRepository: IProductsRepository,
  ) {}
  
   async createProductUnregistered(
    productInterface: ProductInterface,
  ): Promise<ProductInterface | string> {
    const { name } = productInterface;
    const productFound = await this.productsRepository.findProductByName(name);
    if (productFound) {
      throw new ForbiddenException('Product already exists.');
    }
    const newProduct =
      this.productsRepository.registerProduct(productInterface);
    return newProduct;
  }

  async getProductById(id: number): Promise<ProductInterface | string> {
    const productFound = await this.productsRepository.findProductById(id);
    if (!productFound) {
      throw new ForbiddenException(`Product not found.`);
    }
    return productFound;
  }

  public async listProducts(): Promise<ProductInterface[]> {
    return this.productsRepository.getAllProducts();
  }

  public async addProductToStock(id:number ,amout:number): Promise<ProductInterface | string> {
    const productForUpdate = await this.productsRepository.findProductById(id);
    productForUpdate.stock += amout;
    productForUpdate.updatedAt = new Date();
    const updatedProduct = await this.productsRepository.updateProduct( productForUpdate);
    return updatedProduct;
  }

  public async removeProductFromStock( id:number ,amout:number): Promise<ProductInterface | string> {
    const productForUpdate = await this.getProductById(id) as ProductInterface;
    productForUpdate.stock -= amout;
    productForUpdate.updatedAt = new Date();
    const updatedProduct = await this.productsRepository.updateProduct( productForUpdate);
    return updatedProduct;
  }



}
