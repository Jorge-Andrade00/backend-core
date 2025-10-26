import { HttpClientResponse } from './http-client-response.interface';

export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
}

export interface HttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<HttpClientResponse<T>>;
  delete<T>(
    url: string,
    config?: RequestConfig,
  ): Promise<HttpClientResponse<T>>;
  post<T>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<HttpClientResponse<T>>;
  put<T>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<HttpClientResponse<T>>;
  patch<T>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<HttpClientResponse<T>>;
}
