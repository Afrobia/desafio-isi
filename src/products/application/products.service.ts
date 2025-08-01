﻿import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Product } from '../domain/product.interface';
import {
  PRODUCT_REPO_TOKEN,
  IProductsRepository,
} from './outboud-port/products.repository.interface';
import { IProductsService } from './inbound-port/products.service.interface';
import { UpdateProductDto } from '../infraestructure/http/dto/update-product.dto';
import {
  DISCOUNT_SERVICE_TOKEN,
  IDiscountsService,
} from '../../discount-application/application/inbound-port/discount-service.interface';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(
    @Inject(PRODUCT_REPO_TOKEN)
    private readonly productsRepository: IProductsRepository,
    @Inject(DISCOUNT_SERVICE_TOKEN)
    private readonly discountsService: IDiscountsService
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

  private async nameIsValid(name: string): Promise<void> {
    const productFound = await this.productsRepository.findByName(name);
    if (productFound) {
      throw new ForbiddenException(`Product already exists.`);
    }
  }

  public async listOutOfStock(): Promise<Product[]> {
    const allProducts = await this.productsRepository.getAll();
    return allProducts.filter(product => product.stock <= 0);
  }

  addProductToStock(stock: number, amount: number): number {
    return (stock += amount);
  }

  removeProductFromStock(stock: number, amount: number): number {
    const newStock = stock - amount;
    if (newStock < 0) {
      throw new ForbiddenException('Not enough stock available.');
    }
    return (stock -= amount);
  }

  async updateStock(
    id: number,
    productForUpdate: UpdateProductDto
  ): Promise<Product> {
    const { amount, action } = productForUpdate;
    const productUpdated = await this.getById(id).then(async product => {
      if (action === 'add') {
        product.stock = this.addProductToStock(product.stock, amount);
      } else if (action === 'remove') {
        product.stock = this.removeProductFromStock(product.stock, amount);
      }
      product.updatedAt = new Date();
      return await this.productsRepository.update(product);
    });
    if (!productUpdated) {
      throw new ForbiddenException('Product could not be updated.');
    }
    return productUpdated;
  }

  async couponToProduct(productUpdate: Product): Promise<Product> {
    productUpdate.updatedAt = new Date();
    const updatedProduct = await this.productsRepository.update(productUpdate);
    return updatedProduct;
  }

  async applyDiscount(product: number, couponCode: string): Promise<Product> {
    const productFound = await this.getById(product);
    const discount = await this.discountsService.create(
      productFound,
      couponCode
    );
    if (!discount) {
      throw new ForbiddenException('Discount could not be applied.');
    }
    productFound.coupon.id = discount.couponId;
    await this.couponToProduct(productFound);
    return productFound;
  }

  /* async applyDiscountToProduct(
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

  private validatePrice(value: number): string | number {
    if (value < 0.01) {
      throw new ForbiddenException('Discount value must be greater than 0.01');
    }
    return value;
  } */
}
