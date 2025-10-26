import { Injectable } from '@nestjs/common';
import { HttpClient, RequestConfig } from '../interfaces/http-client.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { HttpClientResponse } from '../interfaces/http-client-response.interface';

@Injectable()
export class AxiosHttpClientService implements HttpClient {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(
    url: string,
    config?: RequestConfig,
  ): Promise<HttpClientResponse<T>> {
    try {
      const observable = this.httpService.get<T>(url, config);

      const response = await firstValueFrom(observable);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  async post<T>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<HttpClientResponse<T>> {
    try {
      const observable = this.httpService.post<T>(url, data, config);

      const response = await firstValueFrom(observable);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  async put<T>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<HttpClientResponse<T>> {
    try {
      const observable = this.httpService.put<T>(url, data, config);

      const response = await firstValueFrom(observable);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<HttpClientResponse<T>> {
    try {
      const observable = this.httpService.patch<T>(url, data, config);

      const response = await firstValueFrom(observable);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  async delete<T>(
    url: string,
    config?: RequestConfig,
  ): Promise<HttpClientResponse<T>> {
    try {
      const observable = this.httpService.delete<T>(url, config);

      const response = await firstValueFrom(observable);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  private handleError<T>(error: unknown): HttpClientResponse<T> {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as any;
      const response = axiosError.response;

      return {
        success: false,
        error: {
          message: response?.data?.message || 'An error occurred',
          code: response?.data?.code || 'UNKNOWN_ERROR',
          status: response?.status,
          statusText: response?.statusText,
          details: response?.data,
        },
      };
    }

    return {
      success: false,
      error: {
        message: 'An unexpected error occurred',
        code: 'UNEXPECTED_ERROR',
      },
    };
  }
}
