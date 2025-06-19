import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PRODUCT_MODEL_TOKEN, ProductInterface } from '../model/product.interface';

describe('ProductsService', () => {
  let service: ProductsService;
  let productInterface: ProductInterface = {
      name: 'Test Product',
      description: 'This is a test product',
      price: 100,
      stock: 50,
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PRODUCT_MODEL_TOKEN,
          useValue: productInterface,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productInterface = module.get<ProductInterface>(PRODUCT_MODEL_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('should be instance of ProductsService', () => {
    expect(service).toBeInstanceOf(ProductsService);
  });

  test('should get a attribute productInterface', async () => {
    const productData = productInterface;
    const result = service['getAtributteProduct'](productData);
    expect(result).toEqual({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock: productData.stock,
    }); 
  });

});
