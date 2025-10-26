import { DynamicModule, Module } from '@nestjs/common';
import { PaginationService } from './services/pagination.service';

@Module({})
export class PaginationModule {
  static forRoot(): DynamicModule {
    return {
      module: PaginationModule,
      providers: [PaginationService],
      exports: [PaginationService],
    };
  }
}
