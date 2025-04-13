import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Logger } from '@nestjs/common';

const showLogs: boolean = true; 

export function LogsInterceptor(ms: boolean = false) {
  return {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      if (!showLogs) return next.handle();

      const route = context.switchToHttp().getRequest().url;
      const method = context.switchToHttp().getRequest().method;
      const params = context.switchToHttp().getRequest().params;
      let logRoute = route;
      for (const param in params) {
        logRoute = logRoute.replace(`:${param}`, `${params[param]}:${param}`);
      }

      Logger.log(
        `${ms ? 'Microservice' : 'Generic'} ${method} request recibida en "${logRoute.startsWith('/') ? '' : '/'}${logRoute}"...`,
        'LogsInterceptor',
      );

      return next.handle().pipe(
        tap(() => {
          Logger.log(
            `¡${ms ? 'Microservice' : 'Generic'} ${method} request en "${logRoute.startsWith('/') ? '' : '/'}${logRoute}" respondida exitosamente!`,
            'LogsInterceptor',
          );
        }),
      );
    },
  };
}