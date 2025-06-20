import { ProductInterface } from 'src/products/domain/product.interface';
import { Product } from '../../domain/product';
import { IProductsRepository } from './products.repository.interface';

export class ProductsRepository implements IProductsRepository {
  private products: Product[] = [];

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

  async registerProduct(productModel: ProductInterface): Promise<Product> {
    const { name, description, price, stock } =
      this.getAtributteProduct(productModel);
    const newProduct = new Product(name, description, price, stock);
    this.products.push(newProduct);
    return newProduct;
  }

  async findAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async findProductById(id: number): Promise<Product | null> {
    const productFound = this.products.find(
      (product) => product.getId() === id,
    );
    return productFound || null;
  }

  async findProductByName(name: string): Promise<Product | null> {
    const productFound = this.products.find((product) => product.name === name);
    return productFound || null;
  }
}
