import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  if (!req.url.includes('/login')) {
    return next(req);
  }

  console.log('AuthInterceptor invoked');
  const token = localStorage.getItem('token');
  const modifiedReq = token
    ? req.clone({
        headers: req.headers.append('X-Authentication-Token', token),
      })
    : req;
  return next(modifiedReq).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const token = (event.body as { token?: string })?.token;
          if (token) {
            try {
              const decodedToken = jwtDecode(token);
              console.log('Decoded token:', decodedToken);
              localStorage.setItem('token', token);
              localStorage.setItem(
                'decodedToken',
                JSON.stringify(decodedToken)
              );
            } catch (e) {
              console.error('Failed to decode token:', e);
            }
          }
        }
      },
      error: (err) => {
        console.error('Error in response:', err);
      },
    })
  );
};
