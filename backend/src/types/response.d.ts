export interface ResponseMessage<T = undefined> {
    success: boolean;
    message: string;
    data: T| null;
  }
  
  export interface ErrorMessage {
    error: string;
  }
  
  export interface QueryMessage<T> {
    query: T;
  }