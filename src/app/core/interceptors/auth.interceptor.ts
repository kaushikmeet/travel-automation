import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../modules/auth/auth.service';
import { ToastService } from '../services/toast.service';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const toast = inject(ToastService);
  const token = auth.getToken();

  // 1. ADD TOKEN
  let cloned = req;
  if (token) {
    cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // 2. HANDLE REQUEST & ERRORS
  return next(cloned).pipe(
    catchError((error) => {
      const status = error?.status;
      const message = error?.error?.message || error?.message || 'Something went wrong';

      if (status === 401) {
        toast.error('Session expired. Please login again.');
        auth.logout(); // Redirects to login
      } else if (status === 403) {
        toast.error('You do not have permission to perform this action.');
      } else if (status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(message);
      }

      return throwError(() => error);
    })
  );
};