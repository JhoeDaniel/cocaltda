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
import { navigation, navigations } from './navigation.data';
import { Navigation, TYPE_NAVIGATION } from './navigation.types';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _url: string;
  private _headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private _navigation: BehaviorSubject<Navigation> = new BehaviorSubject(
    navigation
  );
  private _navigations: BehaviorSubject<Navigation[]> = new BehaviorSubject(
    navigations
  );

  constructor(private _httpClient: HttpClient) {
    this._url = environment.urlBackend + '/app/core/navigation';
  }
  /**
   * Getter
   */
  get navigation$(): Observable<Navigation> {
    return this._navigation.asObservable();
  }
  /**
   * Getter for _navigations
   */
  get navigations$(): Observable<Navigation[]> {
    return this._navigations.asObservable();
  }
  /**
   * create
   */
  create(
    id_user_: string,
    id_company: string,
    type_navigation: TYPE_NAVIGATION
  ): Observable<any> {
    return this._navigations.pipe(
      take(1),
      switchMap((navigations) =>
        this._httpClient
          .post(
            this._url + '/create',
            {
              id_user_: parseInt(id_user_),
              company: {
                id_company: parseInt(id_company),
              },
              type_navigation,
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
              const _navigation: Navigation = response.body;
              /**
               * Update the navigation in the store
               */
              this._navigations.next([_navigation, ...navigations]);

              return of(_navigation);
            })
          )
      )
    );
  }
  /**
   * queryRead
   * @param query
   */
  queryRead(query: string): Observable<Navigation[]> {
    return this._httpClient
      .get<Navigation[]>(this._url + `/queryRead/${query ? query : '*'}`)
      .pipe(
        tap((navigations: Navigation[]) => {
          if (navigations) {
            this._navigations.next(navigations);
          } else {
            this._navigations.next([]);
          }
        })
      );
  }
  /**
   * byCompanyQueryRead
   * @param id_company
   * @param query
   */
  byCompanyQueryRead(
    id_company: string,
    query: string
  ): Observable<Navigation[]> {
    return this._httpClient
      .get<Navigation[]>(
        this._url + `/byCompanyQueryRead/${id_company}/${query ? query : '*'}`
      )
      .pipe(
        tap((navigations: Navigation[]) => {
          if (navigations) {
            this._navigations.next(navigations);
          } else {
            this._navigations.next([]);
          }
        })
      );
  }
  /**
   * specificRead
   * @param id_navigation
   */
  specificRead(id_navigation: string): Observable<Navigation> {
    return this._httpClient
      .get<Navigation>(this._url + `/specificRead/${id_navigation}`)
      .pipe(
        tap((navigations: Navigation) => {
          this._navigation.next(navigation);
          return navigations;
        })
      );
  }
  /**
   * specificReadInLocal
   */
  specificReadInLocal(id_navigation: string): Observable<Navigation> {
    return this._navigations.pipe(
      take(1),
      map((navigations) => {
        /**
         * Find
         */
        const navigation =
          navigations.find((item) => item.id_navigation == id_navigation) ||
          null;
        /**
         * Update
         */
        this._navigation.next(navigation!);
        /**
         * Return
         */
        return navigation;
      }),
      switchMap((navigation) => {
        if (!navigation) {
          return throwError(
            () => 'No se encontro el elemento con el id ' + id_navigation + '!'
          );
        }
        return of(navigation);
      })
    );
  }
  /**
   * update
   * @param navigation
   */
  update(navigation: Navigation): Observable<any> {
    return this.navigations$.pipe(
      take(1),
      switchMap((navigations) =>
        this._httpClient
          .patch(this._url + '/update', navigation, {
            headers: this._headers,
          })
          .pipe(
            switchMap((response: any) => {
              /**
               * check the response body to match with the type
               */
              const _navigation: Navigation = response.body;
              /**
               * Find the index of the updated navigation
               */
              const index = navigations.findIndex(
                (item) => item.id_navigation == navigation.id_navigation
              );
              /**
               * Update the navigation
               */
              navigations[index] = _navigation;
              /**
               * Update the navigations
               */
              this._navigations.next(navigations);

              /**
               * Update the navigation
               */
              this._navigation.next(_navigation);

              return of(_navigation);
            })
          )
      )
    );
  }
  /**
   * delete
   * @param id_user_
   * @param id_navigation
   */
  delete(id_user_: string, id_navigation: string): Observable<any> {
    return this.navigations$.pipe(
      take(1),
      switchMap((navigations) =>
        this._httpClient
          .delete(this._url + `/delete`, {
            params: { id_user_, id_navigation },
          })
          .pipe(
            switchMap((response: any) => {
              if (response && response.body) {
                /**
                 * Find the index of the updated navigation
                 */
                const index = navigations.findIndex(
                  (item) => item.id_navigation == id_navigation
                );
                /**
                 * Delete the object of array
                 */
                navigations.splice(index, 1);
                /**
                 * Update the navigations
                 */
                this._navigations.next(navigations);
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
