import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../../application/products.service';
import { ProductInterface } from '../../model/product.interface';
import { Product } from '../../model/product';

Date.now = jest.fn(() => new Date(Date.UTC(2017, 1, 14)).valueOf())
const jestId = jest.spyOn(Product.prototype, 'getId').mockImplementation(() => {
    const idMock = Date.now() + 1000000000
    return idMock
})

describe('ProductsService', () => {
  let service: ProductsService;
  let model: ProductInterface = {
      name: 'Test Product',
      description: 'This is a test product',
      price: 100,
      stock: 50,
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('should be instance of ProductsService', () => {
    expect(service).toBeInstanceOf(ProductsService);
  });

  test('should be Instance of Product', async () => {
    const result = await service.createProduct(model);
    expect(result).toBeInstanceOf(Product)
  });

  test('should be create a product with the same id', async () => {
    const result = await service.createProduct(model)
    expect(result.getId()).toEqual(jestId.mock.results[0].value);
  });

  test('should found a product by name', async () => {
    const result = await service.createProduct(model);
    const productFound = await service['getProductByName'](model.name);
    expect(productFound).toEqual(result);
  });

  test('should throw an error if product already exists', async () => {
    await service.createProductIfNotExists(model);
    await expect(service.createProductIfNotExists(model)).rejects.toThrow(
      `Product with name ${model.name} already exists.`,
    );
  });

  test('should return all products', async () => {
    await service.createProduct(model);
    const products = await service.getAllProducts();
    expect(products).toHaveLength(1);
    expect(products[0].name).toEqual(model.name);
  });

});
