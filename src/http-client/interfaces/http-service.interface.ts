import { AxiosRequestConfig } from 'axios';
import { HttpServiceResponse } from './http-service-response.interface';

export interface HttpService {
  get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<HttpServiceResponse<T>>;
  delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<HttpServiceResponse<T>>;
  post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<HttpServiceResponse<T>>;
  put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<HttpServiceResponse<T>>;
  patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<HttpServiceResponse<T>>;
}
