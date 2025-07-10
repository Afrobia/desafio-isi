import { Product } from '../../domain/product.interface';

export interface IProductsService {
  create(productI: Product): Promise<Product>;
  getById(id: number): Promise<Product>;
  listAll(): Promise<Product[]>;
  delete(id: number): Promise<{ message: string }>;
}

export const PRODUCT_SERVICE_TOKEN = Symbol();
