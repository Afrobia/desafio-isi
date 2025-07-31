import { Test, TestingModule } from "@nestjs/testing";
import { IProductsRepository, PRODUCT_REPO_TOKEN } from "./outboud-port/products.repository.interface";
import { ProductsService } from "./products.service";
import { ForbiddenException } from "@nestjs/common";
import { mockProducts } from "../../mock-data";
import { UpdateProductDto } from "../infraestructure/http/dto/update-product.dto";
import { Actions } from "../domain/actions.enum";


describe('ProductsService', () => {
  let service: ProductsService;
  let repository: IProductsRepository
  let newProduct = {
    name: 'Test Product',
    description: 'Test Description',
    price: 100.00,
    stock: 10,
  };

  beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [ProductsService, { provide: PRODUCT_REPO_TOKEN, useValue: {
          register: jest.fn(),
          findById: jest.fn(),
          findByName: jest.fn(),
          getAll: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        }}],
      }).compile();

      service = module.get<ProductsService>(ProductsService);
      repository = module.get<IProductsRepository>(PRODUCT_REPO_TOKEN);
    });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      jest.spyOn(repository, 'register').mockResolvedValueOnce({
        id: 1,
        ...newProduct,
      });
      const result = await service.create(newProduct);
      expect(result).toMatchObject({
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        stock: newProduct.stock,
      });
    });

    it('should throw an error if product with the same name already exists', async () => {
        jest.spyOn(repository, 'findByName').mockResolvedValueOnce({id: 1, ...newProduct});
        await expect(service.create(newProduct)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getById', () => {
    it('should return a product by id', async () => {
      const product = { id: 1, ...newProduct };
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(product);
      const result = await service.getById(product.id);
      expect(result).toMatchObject({
        id: product.id,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        stock: newProduct.stock,
      });
    });

    it('should throw an error if product not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);
      await expect(service.getById(999)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('listAll', () => {
    it('should return all products', async () => {
      jest.spyOn(repository, 'getAll').mockResolvedValueOnce(mockProducts);
      const result = await service.listAll();
      expect(result).toMatchObject(mockProducts);
    });
  });

  describe('delete', () => {
    it('should delete a product by id', async () => {
      const product = { id: 1, ...newProduct };
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(product);
      jest.spyOn(repository, 'delete').mockResolvedValueOnce();
      const result = await service.delete(product.id);
      expect(result).toMatchObject({ message: 'Product deleted successfully.' });
    });

    it('should throw an error if product not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);
      await expect(service.delete(999)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('listOutOfStock', () => {
    it('should return products that are out of stock', async () => {
      const outOfStockProducts = mockProducts.filter(product => product.stock <= 0);
      jest.spyOn(repository, 'getAll').mockResolvedValueOnce(mockProducts);
      const result = await service.listOutOfStock();
      expect(result).toMatchObject(outOfStockProducts);
    });
  });

  describe('updateStock', () => {
    it('should add stock to a product', () => {
      const initialStock = 10;
      const amountToAdd = 5;
      const newStock = service.addProductToStock(initialStock, amountToAdd);
      expect(newStock).toBe(15);
    });

    it('should remove stock from a product', () => {
      const initialStock = 10;
      const amountToRemove = 5;
      const newStock = service.removeProductFromStock(initialStock, amountToRemove);
      expect(newStock).toBe(5);
    });

    it('should throw an error if removing more stock than available', () => {
      const initialStock = 10;
      const amountToRemove = 15;
      expect(() => service.removeProductFromStock(initialStock, amountToRemove)).toThrow(ForbiddenException);
    });

    it('should update the stock of a product', async () => {
      const product = { id: 1, ...newProduct };
      const updatedStock: UpdateProductDto = { amount: 20, action: Actions.ADD };
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(product);
      jest.spyOn(repository, 'update').mockResolvedValueOnce({ ...product, stock: 30 });
      const result = await service.updateStock(product.id, updatedStock);
      expect(result).toMatchObject({ id: product.id, stock: 30 });
    });

  });

});
