import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { ProductInterface } from '../../domain/product.interface';
import { IProductsService, PRODUCT_SERVICE_TOKEN } from '../../application/products.service.interface';
import { UpdateProductDto } from './update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN)
    private readonly productsService: IProductsService,
  ) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductInterface | string> {
    return this.productsService.createProductUnregistered(createProductDto);
  }

  @Get()
  async getAllProducts(): Promise<ProductInterface[]> {
    return this.productsService.listProducts();
  }

  @Get(':id')
  async getProductById(
    @Param('id') id: number,
  ): Promise<ProductInterface | string> {
    return this.productsService.getProductById(id);
  }
}
