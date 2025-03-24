import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ResponseMessage } from 'src/types/response';

export function ThrowHTTPException(
  message: string,
  errorVariables: string[],
  status: keyof typeof HttpStatus,
  error?: string,
): never {
  throw new HttpException(
    {
      message: [`${errorVariables.join(',')}$${message}`],
      error: error ? error.toUpperCase() : message.toUpperCase(),
      status,
    },
    HttpStatus[status],
  );
}

export function SuccessHTTPAnswer<T extends undefined | { [key: string]: any }>(
  message: string,
  data: T,
): ResponseMessage<T> {
  return {
    message,
    data,
    success: true,
  };
}