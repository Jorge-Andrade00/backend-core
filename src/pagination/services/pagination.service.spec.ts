import { Test, TestingModule } from '@nestjs/testing';
import { PaginationService } from './pagination.service';
import { PaginationParams } from '../interfaces/pagination-params.interface';

describe('PaginationService', () => {
  let service: PaginationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationService],
    }).compile();

    service = module.get<PaginationService>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateSkip', () => {
    it('should return 0 for page 1', () => {
      const result = service.calculateSkip(1, 10);
      expect(result).toBe(0);
    });

    it('should return correct skip value for page 2', () => {
      const result = service.calculateSkip(2, 10);
      expect(result).toBe(10);
    });

    it('should return correct skip value for page 3', () => {
      const result = service.calculateSkip(3, 10);
      expect(result).toBe(20);
    });

    it('should calculate skip with different limit', () => {
      const result = service.calculateSkip(2, 25);
      expect(result).toBe(25);
    });

    it('should handle large page numbers', () => {
      const result = service.calculateSkip(100, 10);
      expect(result).toBe(990);
    });

    it('should return 0 for page 1 with any limit', () => {
      expect(service.calculateSkip(1, 5)).toBe(0);
      expect(service.calculateSkip(1, 20)).toBe(0);
      expect(service.calculateSkip(1, 100)).toBe(0);
    });
  });

  describe('getPaginatedResult', () => {
    const mockParams: PaginationParams = {
      page: 1,
      limit: 10,
    };

    it('should return paginated result with correct structure', () => {
      const mockData = [{ id: 1 }, { id: 2 }];
      const total = 2;

      const result = service.getPaginatedResult([mockData, total], mockParams);

      expect(result).toEqual({
        data: mockData,
        total: 2,
        lastPage: 1,
        currentPage: 1,
        limit: 10,
      });
    });

    it('should calculate lastPage correctly with exact division', () => {
      const mockData = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
      const total = 100;

      const result = service.getPaginatedResult([mockData, total], mockParams);

      expect(result.lastPage).toBe(10);
      expect(result.total).toBe(100);
    });

    it('should calculate lastPage correctly with remainder', () => {
      const mockData = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
      const total = 95;

      const result = service.getPaginatedResult([mockData, total], mockParams);

      expect(result.lastPage).toBe(10);
      expect(result.total).toBe(95);
    });

    it('should handle empty data array', () => {
      const mockData: any[] = [];
      const total = 0;

      const result = service.getPaginatedResult([mockData, total], mockParams);

      expect(result).toEqual({
        data: [],
        total: 0,
        lastPage: 0,
        currentPage: 1,
        limit: 10,
      });
    });

    it('should handle page 2 correctly', () => {
      const mockData = [{ id: 11 }, { id: 12 }];
      const total = 25;
      const params: PaginationParams = { page: 2, limit: 10 };

      const result = service.getPaginatedResult([mockData, total], params);

      expect(result).toEqual({
        data: mockData,
        total: 25,
        lastPage: 3,
        currentPage: 2,
        limit: 10,
      });
    });

    it('should handle different limit sizes', () => {
      const mockData = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));
      const total = 100;
      const params: PaginationParams = { page: 1, limit: 25 };

      const result = service.getPaginatedResult([mockData, total], params);

      expect(result.lastPage).toBe(4);
      expect(result.limit).toBe(25);
    });

    it('should handle single item', () => {
      const mockData = [{ id: 1 }];
      const total = 1;

      const result = service.getPaginatedResult([mockData, total], mockParams);

      expect(result).toEqual({
        data: mockData,
        total: 1,
        lastPage: 1,
        currentPage: 1,
        limit: 10,
      });
    });

    it('should handle NaN lastPage by returning 0', () => {
      const mockData: any[] = [];
      const total = 0;
      const params: PaginationParams = { page: 1, limit: 10 };

      const result = service.getPaginatedResult([mockData, total], params);

      expect(result.lastPage).toBe(0);
    });

    it('should preserve currentPage from params', () => {
      const mockData = [{ id: 1 }];
      const total = 50;
      const params: PaginationParams = { page: 5, limit: 10 };

      const result = service.getPaginatedResult([mockData, total], params);

      expect(result.currentPage).toBe(5);
    });

    it('should work with complex data objects', () => {
      interface User {
        id: number;
        name: string;
        email: string;
      }

      const mockData: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ];
      const total = 2;

      const result = service.getPaginatedResult<User>(
        [mockData, total],
        mockParams,
      );

      expect(result.data).toEqual(mockData);
      expect(result.data[0].name).toBe('John Doe');
    });
  });
});
