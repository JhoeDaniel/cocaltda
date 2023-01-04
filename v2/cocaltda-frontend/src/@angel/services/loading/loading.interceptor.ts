import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AngelLoadingService } from './loading.service';

@Injectable()
export class AngelLoadingInterceptor implements HttpInterceptor {
  handleRequestsAutomatically!: boolean;

  /**
   * Constructor
   */
  constructor(private _angelLoadingService: AngelLoadingService) {
    // Subscribe to the auto
    this._angelLoadingService.auto$.subscribe((value) => {
      this.handleRequestsAutomatically = value;
    });
  }

  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // If the Auto mode is turned off, do nothing
    if (!this.handleRequestsAutomatically) {
      return next.handle(req);
    }

    // Set the loading status to true
    this._angelLoadingService._setLoadingStatus(true, req.url);

    return next.handle(req).pipe(
      finalize(() => {
        // Set the status to false if there are any errors or the request is completed
        this._angelLoadingService._setLoadingStatus(false, req.url);
      })
    );
  }
}
