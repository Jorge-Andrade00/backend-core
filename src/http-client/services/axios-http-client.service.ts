import { Injectable } from '@nestjs/common';
import { HttpClient, RequestConfig } from '../interfaces/http-client.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AxiosHttpClientService implements HttpClient {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const observable = this.httpService.get<T>(url, config);

    const response = await firstValueFrom(observable);

    return response.data;
  }

  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const observable = this.httpService.post<T>(url, data, config);

    const response = await firstValueFrom(observable);

    return response.data;
  }

  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const observable = this.httpService.put<T>(url, data, config);

    const response = await firstValueFrom(observable);

    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const observable = this.httpService.patch<T>(url, data, config);

    const response = await firstValueFrom(observable);

    return response.data;
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    const observable = this.httpService.delete<T>(url, config);

    const response = await firstValueFrom(observable);

    return response.data;
  }
}
