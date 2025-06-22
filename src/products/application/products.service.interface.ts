import { ProductInterface } from '../domain/product.interface';

export interface IProductsService {
  createProductUnregistered(productI: ProductInterface): Promise<ProductInterface | string>;
  getProductById(id: number): Promise<ProductInterface | string>;
  listProducts(): Promise<ProductInterface[]>;
  addProductToStock(product: ProductInterface): Promise<ProductInterface | string>;
}

export const PRODUCT_SERVICE_TOKEN = Symbol();
