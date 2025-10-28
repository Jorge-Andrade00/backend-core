import { Inject, Injectable, Scope } from '@nestjs/common';
import { HttpService } from '../interfaces/http-service.interface';
import { HttpService as NestAxiosHttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { HttpServiceResponse } from '../interfaces/http-service-response.interface';
import { REQUEST } from '@nestjs/core';
import { AxiosRequestConfig } from 'axios';

@Injectable({ scope: Scope.REQUEST })
export class AxiosHttpService implements HttpService {
  constructor(
    private readonly httpService: NestAxiosHttpService,
    @Inject(REQUEST) private readonly request: any,
  ) {}

  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<HttpServiceResponse<T>> {
    try {
      const configurationsProcessed = this.processConfigs(config);

      const observable = this.httpService.get<T>(url, configurationsProcessed);

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
    config?: AxiosRequestConfig,
  ): Promise<HttpServiceResponse<T>> {
    try {
      const configurationsProcessed = this.processConfigs(config);

      const observable = this.httpService.post<T>(
        url,
        data,
        configurationsProcessed,
      );

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
    config?: AxiosRequestConfig,
  ): Promise<HttpServiceResponse<T>> {
    try {
      const configurationsProcessed = this.processConfigs(config);

      const observable = this.httpService.put<T>(
        url,
        data,
        configurationsProcessed,
      );

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
    config?: AxiosRequestConfig,
  ): Promise<HttpServiceResponse<T>> {
    try {
      const configurationsProcessed = this.processConfigs(config);

      const observable = this.httpService.patch<T>(
        url,
        data,
        configurationsProcessed,
      );

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
    config?: AxiosRequestConfig,
  ): Promise<HttpServiceResponse<T>> {
    try {
      const configurationsProcessed = this.processConfigs(config);

      const observable = this.httpService.delete<T>(
        url,
        configurationsProcessed,
      );

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

  private processConfigs(config?: AxiosRequestConfig): AxiosRequestConfig {
    const traceId = this.request['traceId'];
    const headers: Record<string, string> = {};

    headers['x-request-id'] = traceId;

    if (config?.headers) {
      Object.entries(config.headers).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          headers[key] = String(value);
        }
      });
    }

    return {
      ...config,
      headers,
    };
  }
}
