import { ProductInterface } from '../../domain/product.interface';

export interface IProductsRepository {
  registerProduct(product: ProductInterface): Promise<ProductInterface>;
  findProductByName(name: string): Promise<ProductInterface | null>;
  findProductById(id: number): Promise<ProductInterface | null>;
  findAllProducts(): Promise<ProductInterface[]>;
}

export const PRODUCT_REPO_TOKEN = Symbol();
