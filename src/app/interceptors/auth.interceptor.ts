import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userId = localStorage.getItem('userId');

  const authReq = userId
    ? req.clone({ setHeaders: { Authorization: `Bearer ${userId}` } })
    : req;

  return next(authReq).pipe(
    tap({
      next: (event) => {},
      error: (err) => console.error('HTTP error:', err)
    })
  );
};
