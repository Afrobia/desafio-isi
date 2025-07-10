import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '../../domain/product.interface';
import {
  IProductsService,
  PRODUCT_SERVICE_TOKEN,
} from '../../application/inbound-port/products.service.interface';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN)
    private readonly productsService: IProductsService,
  ) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product | string> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.listAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product | string> {
    return this.productsService.getById(id);
  }
  /* 
  @Patch(':id')
  async addProductStock(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product | string> {
    return this.productsService.addToStock(id, updateProductDto.stock);
  }

  @Patch(':id/remove-stock')
  async removeProductStock(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product | string> {
    return this.productsService.removeFromStock(
      id,
      updateProductDto.stock,
    );
  } */

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<{ message: string }> {
    return this.productsService.delete(id);
  }
}
