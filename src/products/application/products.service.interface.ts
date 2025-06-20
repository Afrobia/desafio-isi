import { ProductInterface } from "../model/product.interface";

export interface IProductsService {
  createProductUnregistered(productI: ProductInterface): Promise<ProductInterface | string>;
  getProductById(id: number): Promise<ProductInterface | string>;
  listProducts(): Promise<ProductInterface[]>;
}

export const PRODUCT_SERVICE_TOKEN = Symbol()