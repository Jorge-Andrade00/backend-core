import { HttpServiceResponse } from './http-service-response.interface';

export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
}

export interface HttpService {
  get<T>(url: string, config?: RequestConfig): Promise<HttpServiceResponse<T>>;
  delete<T>(
    url: string,
    config?: RequestConfig,
  ): Promise<HttpServiceResponse<T>>;
  post<T>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<HttpServiceResponse<T>>;
  put<T>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<HttpServiceResponse<T>>;
  patch<T>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<HttpServiceResponse<T>>;
}
