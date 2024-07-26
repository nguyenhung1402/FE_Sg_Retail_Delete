import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any | unknown>> {
        let token = this.accountService.currentAccessToken;

        if (token) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }
        return next.handle(request).pipe(catchError((err) => {
            if (err instanceof HttpErrorResponse &&
                !request.url.includes('/api/v1/signin') && err.status === 401) {
                // auto logout if 401 response returned from api
                this.accountService.logout();
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
       
    }
}