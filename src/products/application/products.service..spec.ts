import { Test, TestingModule } from "@nestjs/testing";
import { IProductsRepository, PRODUCT_REPO_TOKEN } from "./outboud-port/products.repository.interface";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "../infraestructure/http/dto/create-product.dto";
import { mockProducts } from "../../mock-data";
import { ForbiddenException } from "@nestjs/common";

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: IProductsRepository = {
    register: jest.fn().mockImplementation(
        (product) => Promise.resolve({ id: Date.now(), ...product })
    ),
    findByName: jest.fn().mockResolvedValue(null),
    findById: jest.fn().mockResolvedValue(null),
    getAll: jest.fn().mockResolvedValue(mockProducts),
    update: jest.fn().mockResolvedValue(null),
    delete: jest.fn().mockResolvedValue( undefined ),
    };

  let createPoduct: CreateProductDto = {
    name: 'Test Productf',
    description: 'Test Description',
    price: 100.00,
    stock: 10,
  };

  beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        providers: [ProductsService, { provide: PRODUCT_REPO_TOKEN, useValue: repository }],
      }).compile();

      service = app.get<ProductsService>(ProductsService);
      repository = app.get<IProductsRepository>(PRODUCT_REPO_TOKEN);
    });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const result = await service.create(createPoduct);
      expect(result).toMatchObject({
        name: createPoduct.name,
        description: createPoduct.description,
        price: createPoduct.price,
        stock: createPoduct.stock,
      });
    });

    it('should throw an error if product with the same name already exists', async () => {
        jest.spyOn(repository, 'findByName').mockResolvedValueOnce({ id: 1, ...createPoduct });
        await expect(service.create(createPoduct)).rejects.toThrow(ForbiddenException);
    });
  });

  


});