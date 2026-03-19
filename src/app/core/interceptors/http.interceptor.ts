import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { catchError } from 'rxjs';


export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error) => {

      console.log('INTERCEPTOR ERROR:', error); // 🔍 debug

      const status = error?.status;
      const message =
        error?.error?.message ||
        error?.message ||
        'Something went wrong';

      // ✅ SAFE USAGE
      if (status === 401) {
        toast.error('Unauthorized');
      } else if (status === 500) {
        toast.error('Server error');
      } else {
        toast.error(message);
      }

      throw error;
    })
  );
};