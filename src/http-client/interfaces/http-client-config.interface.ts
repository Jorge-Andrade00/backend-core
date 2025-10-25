import { ModuleMetadata, Type } from '@nestjs/common';

export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
}

export interface HttpClientConfigFactory {
  createHttpClientConfig(): Promise<HttpClientConfig> | HttpClientConfig;
}

export interface HttpClientModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<HttpClientConfig> | HttpClientConfig;
  inject?: any[];
  useClass?: Type<HttpClientConfigFactory>;
  useExisting?: Type<HttpClientConfigFactory>;
}
