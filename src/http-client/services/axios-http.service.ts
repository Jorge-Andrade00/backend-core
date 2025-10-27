import { Injectable } from '@nestjs/common';
import {
  HttpService,
  RequestConfig,
} from '../interfaces/http-service.interface';
import { HttpService as NestAxiosHttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { HttpServiceResponse } from '../interfaces/http-service-response.interface';

@Injectable()
export class AxiosHttpService implements HttpService {
  constructor(private readonly httpService: NestAxiosHttpService) {}

  async get<T>(
    url: string,
    config?: RequestConfig,
  ): Promise<HttpServiceResponse<T>> {
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
  ): Promise<HttpServiceResponse<T>> {
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
  ): Promise<HttpServiceResponse<T>> {
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
  ): Promise<HttpServiceResponse<T>> {
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
  ): Promise<HttpServiceResponse<T>> {
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

  private handleError<T>(error: unknown): HttpServiceResponse<T> {
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
