import { ProductInterface } from '../../domain/product.interface';

export interface IProductsRepository {
  registerProduct(product: ProductInterface): Promise<ProductInterface>;
  findProductByName(name: string): Promise<ProductInterface | null>;
  findProductById(id: number): Promise<ProductInterface | null>;
  getAllProducts(): Promise<ProductInterface[]>;
  updateStock(product:ProductInterface): Promise<ProductInterface | null>;
  deleteProduct(id: number): Promise<void>;
}

export const PRODUCT_REPO_TOKEN = Symbol();