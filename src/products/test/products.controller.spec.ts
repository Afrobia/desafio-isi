import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../infraestructure/http/products.controller';
import { IProductsService, PRODUCT_SERVICE_TOKEN } from '../application/products.service.interface';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: IProductsService;
  const productData = {
      name: 'Test Product',
      description: 'This is a test product',
      price: 100,
      stock: 50,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PRODUCT_SERVICE_TOKEN,
          useValue: {
            createProductUnregistered: jest.fn(),
            getProductById: jest.fn(),
            listProducts: jest.fn().mockResolvedValue([]),
          },
        },
      ],
      controllers: [ProductsController],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<IProductsService>(PRODUCT_SERVICE_TOKEN);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('should be instance of ProductsController', () => {
    expect(controller).toBeInstanceOf(ProductsController);
  });

  test('should call createProductUnregistered with correct parameters', async () => {
    jest.spyOn(service, 'createProductUnregistered').mockResolvedValue(productData);

    const result = await controller.createProduct(productData);
    
    expect(result).toEqual(productData);
    expect(service.createProductUnregistered).toHaveBeenCalledWith(productData);
  });

  test('should call getProductById with correct parameters', async () => {
    const productId = 123;
    jest.spyOn(service, 'getProductById').mockResolvedValue(productData);

    const result = await controller.getProductById(productId);
    
    expect(result).toEqual(productData);
    expect(service.getProductById).toHaveBeenCalledWith(productId);
  });

  test('should call listProducts and return an array', async () => {
    const productsArray = [productData];
    jest.spyOn(service, 'listProducts').mockResolvedValue(productsArray);

    const result = await controller.getAllProducts();

    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual(productsArray);
    expect(service.listProducts).toHaveBeenCalled();
  });

});
