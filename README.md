# @jorge-andrade00/backend-core

![GitHub package.json version](https://img.shields.io/github/package-json/v/Jorge-Andrade00/backend-core)
![license](https://img.shields.io/github/license/Jorge-Andrade00/backend-core)

Core NestJS modules and utilities for backend applications.

## Description

This library provides reusable NestJS modules and services for backend applications, starting with an HTTP client module.

## Installation

```bash
# Configurar el registry de GitHub
echo "@jorge-andrade00:registry=https://npm.pkg.github.com" >> .npmrc

# Instalar el paquete
npm install @jorge-andrade00/backend-core
```

## Modules

### HttpClientModule

A configurable HTTP client module built on top of Axios for NestJS applications.

#### Features

- ✅ Configurable base URL and timeout
- ✅ Injectable HTTP client service
- ✅ TypeScript support
- ✅ Async configuration support

#### Usage

**Basic Configuration:**

```typescript
import { Module } from '@nestjs/common';
import { HttpClientModule } from '@jorge-andrade00/backend-core';

@Module({
  imports: [
    HttpClientModule.forRoot({
      baseURL: 'https://api.example.com',
      timeout: 5000,
    }),
  ],
})
export class AppModule {}
```

**Async Configuration:**

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpClientModule } from '@jorge-andrade00/backend-core';

@Module({
  imports: [
    ConfigModule,
    HttpClientModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('API_BASE_URL'),
        timeout: configService.get('API_TIMEOUT'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

**Using the HTTP Client Service:**

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { HTTP_CLIENT, HttpClient } from '@jorge-andrade00/backend-core';

@Injectable()
export class ExampleService {
  constructor(@Inject(HTTP_CLIENT) private httpClient: HttpClient) {}

  async getData(): Promise<any> {
    return this.httpClient.get('/data');
  }

  async postData(data: any): Promise<any> {
    return this.httpClient.post('/data', data);
  }
}
```

### PaginationModule

A module that provides ORM-agnostic pagination utilities for NestJS applications.

#### Features

- ✅ ORM-agnostic pagination service
- ✅ Skip calculation for database queries
- ✅ Standardized pagination response format
- ✅ TypeScript support with generics
- ✅ Easy integration with any ORM (TypeORM, Prisma, Mongoose, etc.)

#### Usage

**Module Configuration:**

```typescript
import { Module } from '@nestjs/common';
import { PaginationModule } from '@jorge-andrade00/backend-core';

@Module({
  imports: [PaginationModule],
})
export class AppModule {}
```

**Using the Pagination Service:**

```typescript
import { Injectable } from '@nestjs/common';
import { PaginationService } from '@jorge-andrade00/backend-core';

@Injectable()
export class UsersService {
  constructor(private paginationService: PaginationService) {}

  async findAll(page: number = 1, limit: number = 10) {
    // Calculate skip for your ORM query
    const skip = this.paginationService.calculateSkip(page, limit);

    // Example with any ORM
    const [data, total] = await Promise.all([
      this.repository.find({ skip, take: limit }),
      this.repository.count(),
    ]);

    // Return paginated result
    return this.paginationService.getPaginatedResult([data, total], {
      page,
      limit,
    });
  }
}
```

**Pagination Response Format:**

```typescript
{
  data: T[],          // Array of items
  total: number,      // Total number of items
  lastPage: number,   // Last page number
  currentPage: number,// Current page
  limit: number       // Items per page
}
```

## API Reference

### HttpClientModule Types

```typescript
interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
}

interface HttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<T>;
  delete<T>(url: string, config?: RequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;
}
```

### PaginationModule Types

```typescript
interface PaginationParams {
  page: number;
  limit: number;
}

interface PaginationResponse<T> {
  data: T[];
  total: number;
  lastPage: number;
  currentPage: number;
  limit: number;
}

class PaginationService {
  calculateSkip(page: number, limit: number): number;
  getPaginatedResult<T>(
    [data, total]: [T[], number],
    params: PaginationParams,
  ): PaginationResponse<T>;
}
```

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build:lib

# Run tests
npm run test

# Run linting
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
