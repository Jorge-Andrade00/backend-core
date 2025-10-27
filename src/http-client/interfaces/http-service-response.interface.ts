export interface HttpServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    status?: number;
    statusText?: string;
    details?: any;
  };
}
