import { DynamicModule, Module } from '@nestjs/common';
import {
  HttpClientConfig,
  HttpClientModuleAsyncOptions,
} from './interfaces/http-client-config.interface';
import { HttpModule } from '@nestjs/axios';
import { AxiosHttpService } from './services/axios-http.service';
import { HTTP_CLIENT } from './consts/http-client.constants';

@Module({})
export class HttpClientModule {
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
