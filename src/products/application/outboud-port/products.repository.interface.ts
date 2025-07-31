import { UpdateResult } from 'typeorm';
import { Product } from '../../domain/product.interface';

export interface IProductsRepository {
  register(product: Product): Promise<Product>;
  findByName(name: string): Promise<Product | null>;
  findById(id: number): Promise<Product | null>;
  getAll(): Promise<Product[]>;
  update(product: Product): Promise<Product | null>;
  delete(product: Product): Promise<void>;
}

export const PRODUCT_REPO_TOKEN = Symbol();
