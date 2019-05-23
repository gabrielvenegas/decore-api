import { IsInt, IsPositive, IsOptional } from "class-validator";
import { Repository, ObjectLiteral, FindManyOptions } from "typeorm";

export interface Pagination {
  totalItems: number;
  pageSize: number;
  pageNumber: number;
}

export interface PaginatedData<T> {
  data: T;
  pagination: Pagination;
}

export class PaginationParams {
  page?: number;
  limit?: number;
}

export const queryPagination = (p?: PaginationParams) => ({
  skip: p.page ? p.limit * p.page : 0,
  take: p.limit || 20
});

export const paginate = (
  data: any,
  count: number,
  p?: PaginationParams
): PaginatedData<any> => ({
  data,
  pagination: {
    totalItems: count,
    pageSize: p.limit || 0,
    pageNumber: p.page || 0
  }
});

export class SimplePaginate<Entity extends ObjectLiteral> {
  async find(
    repo: Repository<Entity>,
    pagination?: PaginationParams,
    options?: FindManyOptions<Entity>
  ): Promise<PaginatedData<Entity[]>> {
    const data = await repo.find({
      ...options,
      ...queryPagination(pagination)
    });
    const count = await repo.count({
      ...options
    });
    return paginate(data, count, pagination);
  }
}
