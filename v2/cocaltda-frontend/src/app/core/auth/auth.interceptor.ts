import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

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
    // Clone the request object
    let newReq = req.clone();

    // Request
    if (
      this._authService.accessToken &&
      !AuthUtils.isTokenExpired(this._authService.accessToken)
    ) {
      newReq = req.clone({
        headers: req.headers.set('token', this._authService.accessToken),
      });
    }

    // Response
    return next.handle(newReq).pipe(
      catchError((error) => {
        // Catch "401 Unauthorized" responses
        if (error instanceof HttpErrorResponse && error.status === 401) {
          const redirectURL =
            this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
            '/signed-in-redirect-core';

          // Navigate to the redirect url
          this._router.navigateByUrl(redirectURL);

          // Sign out
          this._authService.signOut();

          // Reload the app
          location.reload();
        }

        return throwError(() => error);
      })
    );
  }
}
