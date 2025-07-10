import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '../../domain/product.interface';
import {
  IProductsService,
  PRODUCT_SERVICE_TOKEN,
} from '../../application/inbound-port/products.service.interface';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN)
    private readonly productsService: IProductsService,
  ) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product | string> {
    return this.productsService.create(createProductDto);
  }

  @Get('product/:id')
  async getById(@Param('id') id: number): Promise<Product | string> {
    return this.productsService.getById(id);
  }

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productsService.listAll();
  }

  @Get('out-of-stock')
  async getOutOfStock(): Promise<Product[]> {
    return this.productsService.listOutOfStock();
  }

  @Put(':id')
  async updateStock(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product | string> {
    return this.productsService.updateStock(id, updateProductDto);
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
