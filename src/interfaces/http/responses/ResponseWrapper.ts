export interface ResponseWrapper<T> {
  traceId: string;
  success: boolean;
  message: string;
  data: T;
}
