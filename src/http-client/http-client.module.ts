import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import {
  HttpClientConfig,
  HttpClientModuleAsyncOptions,
} from './interfaces/http-client-config.interface';
import { HttpModule, HttpService as NestAxiosHttpService } from '@nestjs/axios';
import { AxiosHttpService } from './services/axios-http.service';
import { HTTP_CLIENT } from './consts/http-client.constants';
import { InternalAxiosRequestConfig } from 'axios';

@Module({})
export class HttpClientModule implements OnModuleInit {
  constructor(private readonly httpService: NestAxiosHttpService) {}

  onModuleInit() {
    this.httpService.axiosRef.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Get traceId from request context if available
        const traceId = (config as any).traceId;

        if (traceId) {
          config.headers['x-request-id'] = traceId;
          console.log('Request Interceptor - TraceId added:', config.headers);
        }

        return config;
      },
    );
  }

  static forRoot(config: HttpClientConfig): DynamicModule {
    return {
      module: HttpClientModule,
      imports: [
        HttpModule.register({
          baseURL: config.baseURL,
          timeout: config.timeout,
        }),
      ],
      providers: [
        AxiosHttpService,
        {
          provide: HTTP_CLIENT,
          useExisting: AxiosHttpService,
        },
      ],
      exports: [HTTP_CLIENT],
    };
  }

  static forRootAsync(options: HttpClientModuleAsyncOptions): DynamicModule {
    return {
      module: HttpClientModule,
      imports: [
        ...(options.imports || []),
        HttpModule.registerAsync({
          useFactory: options.useFactory,
          inject: options.inject || [],
        }),
      ],
      providers: [
        AxiosHttpService,
        {
          provide: HTTP_CLIENT,
          useExisting: AxiosHttpService,
        },
      ],
      exports: [HTTP_CLIENT],
    };
  }
}
