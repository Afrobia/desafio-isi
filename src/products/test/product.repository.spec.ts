import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRepository } from '../infraestructure/repository/products.repository';
import { ProductInterface } from '../model/product.interface';
import { Product } from '../model/product';

Date.now = jest.fn(() => new Date(Date.UTC(2017, 1, 14)).valueOf());
const jestId = jest.spyOn(Product.prototype, 'getId').mockImplementation(() => {
  const idMock = Date.now() + 1000000000;
  return idMock;
});

describe('ProductsRepository', () => {
  let repository: ProductsRepository;
  let productTest: ProductInterface = {
    name: 'Test Product',
    description: 'This is a test product',
    price: 100,
    stock: 50,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsRepository],
    }).compile();

    repository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  test('should be instance of ProductsRepository', () => {
    expect(repository).toBeInstanceOf(ProductsRepository);
  });

  test('should be Instance of Product', async () => {
    const result = await repository.registerProduct(productTest);
    expect(result).toBeInstanceOf(Product);
  });

  test('should be create a product with the same id', async () => {
    const result = await repository.registerProduct(productTest);
    expect(result.getId()).toEqual(jestId.mock.results[0].value);
  });
});
