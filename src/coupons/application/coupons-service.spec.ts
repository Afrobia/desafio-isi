import { Test, TestingModule } from '@nestjs/testing';
import { CouponsService } from './coupons.service';
import { COUPONS_REPO_TOKEN, ICouponsRepository} from './outbound-port/coupon.repository.interface';
import { TypeCoupons } from '../domain/coupon-enum';
import { COUPONS_SERVICE_TOKEN } from './inbound-port/coupon.service.interface';


describe('CouponsService', () => {
  let service: CouponsService;
  let repository: ICouponsRepository;
  let mockCoupon = {
      code: 'test-coupon',
      type: TypeCoupons.FIXED,
      value: 100,
      one_shot: true,
      valid_until: new Date(),
    }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: COUPONS_SERVICE_TOKEN,
          useClass: CouponsService,
        },
        {
          provide: COUPONS_REPO_TOKEN,
          useValue: {
            register: jest.fn(),
            findById: jest.fn(),
            findByCode: jest.fn(),
            getAll: jest.fn(),
            delete: jest.fn(),
            restore: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CouponsService>(COUPONS_SERVICE_TOKEN);
    repository = module.get<ICouponsRepository>(COUPONS_REPO_TOKEN);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('should create coupon', async () => {
    jest.spyOn(repository, 'register').mockResolvedValue(mockCoupon);
    const result = await service.create(mockCoupon);
    expect(result).toMatchObject({
      code: mockCoupon.code,
      type: mockCoupon.type,
      value: mockCoupon.value,
      one_shot: mockCoupon.one_shot,
    });
  });

  test('should get coupon by id', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValue(mockCoupon);
    const result = await service.getById(1);
    expect(result).toMatchObject(mockCoupon);
  });

  test('should get coupon by code', async () => {
    jest.spyOn(repository, 'findByCode').mockResolvedValue(mockCoupon);
    const result = await service.getByCode(mockCoupon.code);
    expect(result).toMatchObject(mockCoupon);
  });

  test('should list all coupons', async () => {
    jest.spyOn(repository, 'getAll').mockResolvedValue([mockCoupon]);
    const result = await service.listAll();
    expect(result).toMatchObject([mockCoupon]);
  });

  test('should delete coupon by code', async () => {
    jest.spyOn(repository, 'findByCode').mockResolvedValue(mockCoupon);
    jest.spyOn(repository, 'delete').mockResolvedValue();

    const result = await service.delete(mockCoupon.code);
    expect(result).toMatchObject({message: `Coupon deleted successfully.`});
  });

  test('should restore coupon', async () => {
    const restoreData = { code: mockCoupon.code, valid_until: new Date() };
    jest.spyOn(repository, 'restore').mockResolvedValue(mockCoupon);
    const result = await service.restore(restoreData);
    expect(result).toMatchObject(mockCoupon);
  });
});
