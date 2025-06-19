import { Test, TestingModule } from '@nestjs/testing';
import { Product } from './product';

describe('Product', () => {
  let model: Product;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Product],
    }).compile();

    model = module.get<Product>(Product);
  });

  it('should be defined', () => {
    expect(model).toBeDefined();
  });

  test("should create a product with instance of Product", () => {
    const product = new Product("Test Product", "This is a test product", 100, 50);
    if(product) {
        expect(product).toBeInstanceOf(Product);
    }
  })

  test("should have the same properties as ProductModel", () => {
    const product = new Product("Test Product", "This is a test product", 100, 50);
    const { name, description, price, stock, createdAt, updatedAt, deletedAt } = product;

    if(product) {
        expect(name).toBe("Test Product");
        expect(description).toBe("This is a test product");
        expect(price).toBe(100);
        expect(stock).toBe(50);
        expect(createdAt).toBeInstanceOf(Date);
        expect(updatedAt).toBeInstanceOf(Date);
        expect(deletedAt).toBeNull();
    }
  })

});