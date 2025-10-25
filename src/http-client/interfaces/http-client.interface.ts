export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
}

export interface HttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<T>;
  delete<T>(url: string, config?: RequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;
}
