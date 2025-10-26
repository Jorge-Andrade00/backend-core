import { Injectable } from '@nestjs/common';
import { PaginationParams } from '../interfaces/pagination-params.interface';
import { PaginationResponse } from '../interfaces/pagination-response.interface';

@Injectable()
export class PaginationService {
  public calculateSkip(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  public getPaginatedResult<T>(
    [data, total]: [T[], number],
    params: PaginationParams,
  ): PaginationResponse<T> {
    const { limit, page } = params;

    const lastPage = Math.ceil(total / limit);

    return {
      data,
      total,
      lastPage: isNaN(lastPage) ? 0 : lastPage,
      currentPage: page,
      limit,
    };
  }
}
