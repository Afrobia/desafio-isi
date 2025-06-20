import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../infraestructure/http/products.controller';
import { IProductsService } from '../application/products.service.interface';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: IProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'PRODUCT_SERVICE_TOKEN',
          useValue: {
            createProductUnregistered: jest.fn(),
            findProductByName: jest.fn(),
            findProductById: jest.fn(),
            findAllProducts: jest.fn().mockResolvedValue([]),
          },
        },
      ],
      controllers: [ProductsController],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<IProductsService>('PRODUCT_SERVICE_TOKEN');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
