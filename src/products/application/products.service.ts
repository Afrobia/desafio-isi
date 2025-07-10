import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Product } from '../domain/product.interface';
import { PRODUCT_REPO_TOKEN, IProductsRepository} from './outboud-port/products.repository.interface';
import { IProductsService } from './inbound-port/products.service.interface';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(
    @Inject(PRODUCT_REPO_TOKEN)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async create(product: Product): Promise<Product> {
    const { name } = product;
    await this.nameIsValid(name);
    const newProduct = await this.productsRepository.register(product);
    if (!newProduct) {
      throw new ForbiddenException('Product could not be created.');
    }
    return newProduct;
  }

  async getById(id: number): Promise<Product> {
    const productFound = await this.productsRepository.findById(id);
    if (!productFound) {
      throw new ForbiddenException(`Product not found.`);
    }
    return productFound;
  }

  public async listAll(): Promise<Product[]> {
    return this.productsRepository.getAll();
  }

  async delete(id: number): Promise<{ message: string }> {
    const productForDelete = await this.getById(id);
    await this.productsRepository.delete(productForDelete);
    const productDeleted = await this.productsRepository.findById(id);
    if (productDeleted) {
      throw new ForbiddenException('Product could not be deleted.');
    }
    return { message: 'Product deleted successfully.' };
  }

  async nameIsValid(name: string): Promise<void> {
    const productFound = await this.productsRepository.findByName(name);
    if (productFound) {
      throw new ForbiddenException(`Product already exists.`);
    }
  }
  /*
  public async listProductsOutOfStock(): Promise<Product[]> {
    const allProducts = await this.productsRepository.getAllProducts();
    return allProducts.filter((product) => product.stock <= 0);
  }

  public async addProductToStock(
    id: number,
    amout: number,
  ): Promise<Product | string> {
    const productForUpdate = await this.productsRepository.findProductById(id);
    productForUpdate.stock += amout;
    productForUpdate.updatedAt = new Date();
    productForUpdate.deletedAt = null;
    const updatedProduct =
      await this.productsRepository.updateProduct(productForUpdate);
    return updatedProduct;
  }

  async applyDiscountToProduct(
    product: Product,
  ): Promise<Product> {
    const coupon = product.coupon;
    let finalPrice = 0;

    const { value, type } = coupon;
    if (type == 'percent') {
      const discount = product.price * (value / 100);
      finalPrice = product.price - discount;
    } else {
      finalPrice = product.price - value;
    }

    product.finalPrice = this.validatePrice(finalPrice) as number;
    product.discount = {
      type: coupon.type,
      value: coupon.value,
      appliedAt: new Date(),
    };

    return product;
  }

  async updateProduct(product: Product): Promise<Product> {
    product.updatedAt = new Date();

    const updatedProduct = await this.applyDiscountToProduct(product);
    return updatedProduct;
  }

  private validatePrice(value: number): string | number {
    if (value < 0.01) {
      throw new ForbiddenException('Discount value must be greater than 0.01');
    }
    return value;
  }

  public async removeProductFromStock(
    id: number,
    amout: number,
  ): Promise<Product | string> {
    const productForUpdate = (await this.getProductById(
      id,
    )) as Product;
    if (!this.stockIsAvailable(productForUpdate, amout)) {
      throw new ForbiddenException('Not enough stock available.');
    }
    productForUpdate.stock -= amout;
    productForUpdate.updatedAt = new Date();
    const updatedProduct =
      await this.productsRepository.updateProduct(productForUpdate);
    return updatedProduct;
  }

  async addCouponToProduct(
    product: Product,
  ): Promise<Product> {
    const productForUpdate = product;
    productForUpdate.coupon = product.coupon;
    productForUpdate.updatedAt = new Date();
    const updatedProduct =
      await this.productsRepository.updateProduct(productForUpdate);
    return updatedProduct;
  }

  private stockIsAvailable(product: Product, amount: number): boolean {
    return product.stock >= amount ? true : false;
  } */
}
