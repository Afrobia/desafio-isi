import { ProductInterface } from  '../../domain/product.interface';

export interface IProductsService {
  createProductUnregistered(productI: ProductInterface): Promise<ProductInterface | string>;
  getProductById(id: number): Promise<ProductInterface | string>;
  listProducts(): Promise<ProductInterface[]>;
  addProductToStock(id:number,amount:number): Promise<ProductInterface | string>;
  removeProductFromStock(id:number ,amout:number): Promise<ProductInterface | string>;
  deleteProduct(id: number): Promise<string>;
}

export const PRODUCT_SERVICE_TOKEN = Symbol();
