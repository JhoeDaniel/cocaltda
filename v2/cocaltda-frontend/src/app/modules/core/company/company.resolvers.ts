import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyService } from './company.service';
import { Company } from './company.types';

@Injectable({
  providedIn: 'root',
})
export class CompanyResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(
    private _companyService: CompanyService,
    private _router: Router
  ) {}

  /** ----------------------------------------------------------------------------------------------------- */
  /** @ Public methods
   /** ----------------------------------------------------------------------------------------------------- */

  /**
   * Resolver
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Company> {
    return this._companyService
      .specificReadInLocal(route.paramMap.get('id_company')!)
      .pipe(
        /**
         * Error here means the requested is not available
         */
        catchError((error) => {
          /**
           * Log the error
           */
          // console.error(error);
          /**
           * Get the parent url
           */
          const parentUrl = state.url.split('/').slice(0, -1).join('/');
          /**
           * Navigate to there
           */
          this._router.navigateByUrl(parentUrl);
          /**
           * Throw an error
           */
          return throwError(() => error);
        })
      );
  }
}
