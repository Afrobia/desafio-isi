import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../../products/application/products.service';
import { ProductInterface } from '../../products/model/product.interface';
import { Product } from '../../products/model/product';
import {
  PRODUCT_REPO_TOKEN,
  ProductsIRepository,
} from '../../products/infraestructure/db/products.repository.interface';


describe('ProductsService', () => {
  let service: ProductsService;
  let productIRepository: ProductsIRepository;
  let modelTest: ProductInterface = {
    name: 'Test Product',
    description: 'This is a test product',
    price: 100,
    stock: 50,
  };
  const { name, description, price, stock } = modelTest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PRODUCT_REPO_TOKEN,
          useValue: {
            registerProduct: jest.fn(),
            findProductByName: jest.fn(),
            findProductById: jest.fn(),
            findAllProducts: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productIRepository = module.get<ProductsIRepository>(PRODUCT_REPO_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('should be instance of ProductsService', () => {
    expect(service).toBeInstanceOf(ProductsService);
  });

  test('should be Instance of Product', async () => {
    jest.spyOn(productIRepository, 'registerProduct').mockResolvedValue(
        new Product(name, description, price, stock),
      );
    const result = await service.createProductUnregistered(modelTest);
    expect(result).toBeInstanceOf(Product);
  });

  test('should throw an error if product already exists', async () => {
    jest.spyOn(productIRepository, 'findProductByName').mockResolvedValue(
      new Product(name, description, price, stock),
    );

    await expect(service.createProductUnregistered(modelTest)).rejects.toThrow(
      'Product already exists.',
    );
  });

  test('should return a product by id', async () => {
    const product = new Product(name, description, price, stock);
    jest.spyOn(productIRepository, 'findProductById').mockResolvedValue(product);
    const result = await service.getProductById(product.getId());
    expect(result).toEqual(product);
  });

  test('should throw an error if product not found by id', async () => {
    jest.spyOn(productIRepository, 'findProductById').mockResolvedValue(null);
    await expect(service.getProductById(999)).rejects.toThrow(
      'Product not found.',
    );
  });

  test('should list all products', async () => {
    const products = [new Product(name, description, price, stock)];
    jest.spyOn(productIRepository, 'findAllProducts').mockResolvedValue(products);
    const result = await service.listProducts();
    expect(result).toEqual(products);
  });

});
