# @jofas/backend-core

![npm version](https://img.shields.io/npm/v/@jofas/backend-core)
![license](https://img.shields.io/npm/l/@jofas/backend-core)

Core NestJS modules and utilities for backend applications.

## Description

This library provides reusable NestJS modules and services for backend applications, starting with an HTTP client module.

## Installation

```bash
npm install @jofas/backend-core
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
import { HttpClientModule } from '@jofas/backend-core';

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
import { HttpClientModule } from '@jofas/backend-core';

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
import { HTTP_CLIENT, HttpClient } from '@jofas/backend-core';

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

## API Reference

### Types

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
