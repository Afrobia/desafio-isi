import { ForbiddenException, Injectable } from '@nestjs/common';
import { ProductInterface } from '../model/product.interface';
import { Product } from '../model/product';



@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor() {}

  private getAtributteProduct(productInterface: ProductInterface): ProductInterface {
    return {
      name: productInterface.name,
      description: productInterface.description,
      price: productInterface.price,
      stock: productInterface.stock,
    };
  }

  async createProductIfNotExists(productInterface: ProductInterface): Promise<Product | string> {
    const { name } = this.getAtributteProduct(productInterface);
    const productFound = await this.getProductByName(name);
    if (productFound) {
      throw new Error(`Product with name ${name} already exists.`);
    }
    return this.createProduct(productInterface);
  }

  async createProduct(productInterface: ProductInterface): Promise<Product> {
    const { name, description, price, stock } =
      this.getAtributteProduct(productInterface);
    const newProduct = new Product(name, description, price, stock);
    this.products.push(newProduct);
    return newProduct;
  }

  private async getProductByName(name: string): Promise<ProductInterface | null> {
    const productFound = this.products.find((product) => product.name === name);
    if (!productFound) {
      return null;
    }
    return productFound;
  }

  public async getAllProducts(): Promise<ProductInterface[]> {
    return this.products;
  }

  async getProductById(id: number): Promise<ProductInterface | null> {
    throw new Error('Method not implemented.');
  }
  async updateProduct(id: number, product: ProductInterface ): Promise<ProductInterface | null> {
    throw new Error('Method not implemented.');
  }

  private async deleteProduct(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
