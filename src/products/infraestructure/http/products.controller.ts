import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE_TOKEN)
    private readonly productsService: IProductsService,
  ) {}

  @Post()
  @ApiOperation({summary: "Cadastra um novo produto"})
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product | string> {
    return this.productsService.create(createProductDto);
  }
  
  @Post(':id/apply-discount')
  @ApiOperation({summary: "Aplica um desconto ao produto"})
  @HttpCode(HttpStatus.OK)
  async applyDiscount(
    @Param('id') id: number,
    @Body('couponCode') couponCode: string,
  ): Promise<Product | string> {
    return this.productsService.applyDiscount(id, couponCode);
  }

  @Get('product/:id')
  @ApiOperation({summary: "Encontra o produto por ID"})
  async getById(@Param('id') id: number): Promise<Product | string> {
    return this.productsService.getById(id);
  }

  @Get()
  @ApiOperation({summary: "Lista todos os produtos"})
  async getAll(): Promise<Product[]> {
    return this.productsService.listAll();
  }

  @Get('out-of-stock')
  @ApiOperation({summary: "Lista todos os produtos fora de estoque"})
  async getOutOfStock(): Promise<Product[]> {
    return this.productsService.listOutOfStock();
  }

  @Put(':id')
  @ApiOperation({summary: "Atualiza o estoque do produto"})
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
  @ApiOperation({summary: "Deleta o produto pelo ID"})
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('id') id: number): Promise<{ message: string }> {
    return this.productsService.delete(id);
  }
}
