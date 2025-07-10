import { Test, TestingModule } from "@nestjs/testing";
import { IProductsRepository, PRODUCT_REPO_TOKEN } from "./outboud-port/products.repository.interface";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "../infraestructure/http/dto/create-product.dto";
import { ForbiddenException } from "@nestjs/common";
import { mockProducts } from "../../mock-data";


describe('ProductsService', () => {
  let service: ProductsService;
  let repository: IProductsRepository
  let createPoduct: CreateProductDto = {
    name: 'Test Productf',
    description: 'Test Description',
    price: 100.00,
    stock: 10,
  };

  beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        providers: [ProductsService, { provide: PRODUCT_REPO_TOKEN, useValue: {
          register: jest.fn(),
          findById: jest.fn(),
          findByName: jest.fn(),
          getAll: jest.fn(),
          update: jest.fn(),
        }}],
      }).compile();

      service = app.get<ProductsService>(ProductsService);
      repository = app.get<IProductsRepository>(PRODUCT_REPO_TOKEN);
    });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      jest.spyOn(repository, 'register').mockResolvedValueOnce({
        id: 1,
        ...createPoduct,
      });
      const result = await service.create(createPoduct);
      expect(result).toMatchObject({
        name: createPoduct.name,
        description: createPoduct.description,
        price: createPoduct.price,
        stock: createPoduct.stock,
      });
    });

    it('should throw an error if product with the same name already exists', async () => {
        jest.spyOn(repository, 'findByName').mockResolvedValueOnce({id: 1, ...createPoduct});
        await expect(service.create(createPoduct)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getById', () => {
    it('should return a product by id', async () => {
      const product = { id: 1, ...createPoduct };
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(product);
      const result = await service.getById(product.id);
      expect(result).toMatchObject({
        id: product.id,
        name: createPoduct.name,
        description: createPoduct.description,
        price: createPoduct.price,
        stock: createPoduct.stock,
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

});