// angular
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

// 3'rd party
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// app
import { Toaster } from '../../shared';
import { LoadingBarService } from '../modules';

/* Passes HttpErrorResponse to application-wide error handler */

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly _toaster: Toaster,
    private readonly _loadingBarService: LoadingBarService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!window.navigator.onLine) {
      this._loadingBarService.hide();
      this._toaster.open({
        type: 'danger',
        caption: 'Internet connection failed',
        text: 'Please check your internet connection ... !',
      });
      return EMPTY;
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        this._loadingBarService.hide();
        const { status } = err;
        if (err instanceof HttpErrorResponse && status === 0) {
          this._toaster.open({
            type: 'danger',
            caption: `Status: ${status}`,
            text: 'Server connection error!',
          });
        }

        if (err instanceof HttpErrorResponse && status === 404) {
          this._toaster.open({
            type: 'danger',
            caption: `Status: ${status}`,
            text: 'Cannot find service!',
          });
        }

        if (err instanceof HttpErrorResponse && status === 403) {
          this._toaster.open({
            type: 'danger',
            caption: `Status: ${status}`,
            text: 'You do not have permission !',
          });
        }

        if (err instanceof HttpErrorResponse && status === 401) {
          this._toaster.open({
            type: 'danger',
            caption: `Status: ${status}`,
            text: 'Permission denied!',
          });
        }

        return throwError(err);
      })
    );
  }
}
