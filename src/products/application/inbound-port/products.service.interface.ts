import { UpdateProductDto } from '../../../products/infraestructure/http/dto/update-product.dto';
import { Product } from '../../domain/product.interface';

export interface IProductsService {
  create(productI: Product): Promise<Product>;
  getById(id: number): Promise<Product>;
  listAll(): Promise<Product[]>;
  listOutOfStock(): Promise<Product[]>;
  updateStock(id: number, productForUpdate: UpdateProductDto): Promise<Product>;
  applyDiscount(id: number, couponCode: string): Promise<Product>;
  delete(id: number): Promise<{ message: string }>;
}

export const PRODUCT_SERVICE_TOKEN = Symbol();
