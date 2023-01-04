import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { company, companys } from './company.data';
import { Company } from './company.types';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private _url: string;
  private _headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private _company: BehaviorSubject<Company> = new BehaviorSubject(company);
  private _companys: BehaviorSubject<Company[]> = new BehaviorSubject(companys);

  constructor(private _httpClient: HttpClient) {
    this._url = environment.urlBackend + '/app/core/company';
  }
  /**
   * Getter
   */
  get company$(): Observable<Company> {
    return this._company.asObservable();
  }
  /**
   * Getter for _companys
   */
  get companys$(): Observable<Company[]> {
    return this._companys.asObservable();
  }
  /**
   * create
   */
  create(id_user_: string): Observable<any> {
    return this._companys.pipe(
      take(1),
      switchMap((companys) =>
        this._httpClient
          .post(
            this._url + '/create',
            {
              id_user_: parseInt(id_user_),
            },
            {
              headers: this._headers,
            }
          )
          .pipe(
            switchMap((response: any) => {
              /**
               * check the response body to match with the type
               */
              const _company: Company = response.body;
              /**
               * Update the company in the store
               */
              this._companys.next([_company, ...companys]);

              return of(_company);
            })
          )
      )
    );
  }
  /**
   * queryRead
   * @param query
   */
  queryRead(query: string): Observable<Company[]> {
    return this._httpClient
      .get<Company[]>(this._url + `/queryRead/${query ? query : '*'}`)
      .pipe(
        tap((companys: Company[]) => {
          if (companys) {
            this._companys.next(companys);
          } else {
            this._companys.next([]);
          }
        })
      );
  }
  /**
   * bySettingQueryRead
   * @param id_setting
   * @param query
   */
  bySettingQueryRead(id_setting: string, query: string): Observable<Company[]> {
    return this._httpClient
      .get<Company[]>(
        this._url + `/bySettingQueryRead/${id_setting}/${query ? query : '*'}`
      )
      .pipe(
        tap((companys: Company[]) => {
          if (companys) {
            this._companys.next(companys);
          } else {
            this._companys.next([]);
          }
        })
      );
  }
  /**
   * specificRead
   * @param id_company
   */
  specificRead(id_company: string): Observable<Company> {
    return this._httpClient
      .get<Company>(this._url + `/specificRead/${id_company}`)
      .pipe(
        tap((companys: Company) => {
          this._company.next(company);
          return companys;
        })
      );
  }
  /**
   * specificReadInLocal
   */
  specificReadInLocal(id_company: string): Observable<Company> {
    return this._companys.pipe(
      take(1),
      map((companys) => {
        /**
         * Find
         */
        const company =
          companys.find((item) => item.id_company == id_company) || null;
        /**
         * Update
         */
        this._company.next(company!);
        /**
         * Return
         */
        return company;
      }),
      switchMap((company) => {
        if (!company) {
          return throwError(
            () => 'No se encontro el elemento con el id ' + id_company + '!'
          );
        }
        return of(company);
      })
    );
  }
  /**
   * update
   * @param company
   */
  update(company: Company): Observable<any> {
    return this.companys$.pipe(
      take(1),
      switchMap((companys) =>
        this._httpClient
          .patch(this._url + '/update', company, {
            headers: this._headers,
          })
          .pipe(
            switchMap((response: any) => {
              /**
               * check the response body to match with the type
               */
              const _company: Company = response.body;
              /**
               * Find the index of the updated company
               */
              const index = companys.findIndex(
                (item) => item.id_company == company.id_company
              );
              /**
               * Update the company
               */
              companys[index] = _company;
              /**
               * Update the companys
               */
              this._companys.next(companys);

              /**
               * Update the company
               */
              this._company.next(_company);

              return of(_company);
            })
          )
      )
    );
  }
  /**
   * delete
   * @param id_user_
   * @param id_company
   */
  delete(id_user_: string, id_company: string): Observable<any> {
    return this.companys$.pipe(
      take(1),
      switchMap((companys) =>
        this._httpClient
          .delete(this._url + `/delete`, {
            params: { id_user_, id_company },
          })
          .pipe(
            switchMap((response: any) => {
              if (response && response.body) {
                /**
                 * Find the index of the updated company
                 */
                const index = companys.findIndex(
                  (item) => item.id_company == id_company
                );
                /**
                 * Delete the object of array
                 */
                companys.splice(index, 1);
                /**
                 * Update the companys
                 */
                this._companys.next(companys);
                return of(response.body);
              } else {
                return of(false);
              }
            })
          )
      )
    );
  }
}
