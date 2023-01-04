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
import { typeUser, typeUsers } from './type-user.data';
import { TypeUser } from './type-user.types';

@Injectable({
  providedIn: 'root',
})
export class TypeUserService {
  private _url: string;
  private _headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private _typeUser: BehaviorSubject<TypeUser> = new BehaviorSubject(typeUser);
  private _typeUsers: BehaviorSubject<TypeUser[]> = new BehaviorSubject(
    typeUsers
  );

  constructor(private _httpClient: HttpClient) {
    this._url = environment.urlBackend + '/app/core/type_user';
  }
  /**
   * Getter
   */
  get typeUser$(): Observable<TypeUser> {
    return this._typeUser.asObservable();
  }
  /**
   * Getter for _typeUsers
   */
  get typeUsers$(): Observable<TypeUser[]> {
    return this._typeUsers.asObservable();
  }
  /**
   * create
   */
  create(id_user_: string): Observable<any> {
    return this._typeUsers.pipe(
      take(1),
      switchMap((typeUsers) =>
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
              const _typeUser: TypeUser = response.body;
              /**
               * Update the typeUser in the store
               */
              this._typeUsers.next([_typeUser, ...typeUsers]);

              return of(_typeUser);
            })
          )
      )
    );
  }
  /**
   * queryRead
   * @param query
   */
  queryRead(query: string): Observable<TypeUser[]> {
    return this._httpClient
      .get<TypeUser[]>(this._url + `/queryRead/${query ? query : '*'}`)
      .pipe(
        tap((typeUsers: TypeUser[]) => {
          if (typeUsers) {
            this._typeUsers.next(typeUsers);
          } else {
            this._typeUsers.next([]);
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
  ): Observable<TypeUser[]> {
    return this._httpClient
      .get<TypeUser[]>(
        this._url + `/byCompanyQueryRead/${id_company}/${query ? query : '*'}`
      )
      .pipe(
        tap((typeUsers: TypeUser[]) => {
          if (typeUsers) {
            this._typeUsers.next(typeUsers);
          } else {
            this._typeUsers.next([]);
          }
        })
      );
  }
  /**
   * byProfileQueryRead
   * @param id_profile
   * @param query
   */
  byProfileQueryRead(
    id_profile: string,
    query: string
  ): Observable<TypeUser[]> {
    return this._httpClient
      .get<TypeUser[]>(
        this._url + `/byProfileQueryRead/${id_profile}/${query ? query : '*'}`
      )
      .pipe(
        tap((typeUsers: TypeUser[]) => {
          if (typeUsers) {
            this._typeUsers.next(typeUsers);
          } else {
            this._typeUsers.next([]);
          }
        })
      );
  }
  /**
   * specificRead
   * @param id_typeUser
   */
  specificRead(id_typeUser: string): Observable<TypeUser> {
    return this._httpClient
      .get<TypeUser>(this._url + `/specificRead/${id_typeUser}`)
      .pipe(
        tap((typeUsers: TypeUser) => {
          this._typeUser.next(typeUser);
          return typeUsers;
        })
      );
  }
  /**
   * specificReadInLocal
   */
  specificReadInLocal(id_typeUser: string): Observable<TypeUser> {
    return this._typeUsers.pipe(
      take(1),
      map((typeUsers) => {
        /**
         * Find
         */
        const typeUser =
          typeUsers.find((item) => item.id_type_user == id_typeUser) || null;
        /**
         * Update
         */
        this._typeUser.next(typeUser!);
        /**
         * Return
         */
        return typeUser;
      }),
      switchMap((typeUser) => {
        if (!typeUser) {
          return throwError(
            () => 'No se encontro el elemento con el id ' + id_typeUser + '!'
          );
        }
        return of(typeUser);
      })
    );
  }
  /**
   * update
   * @param typeUser
   */
  update(typeUser: TypeUser): Observable<any> {
    return this.typeUsers$.pipe(
      take(1),
      switchMap((typeUsers) =>
        this._httpClient
          .patch(this._url + '/update', typeUser, {
            headers: this._headers,
          })
          .pipe(
            switchMap((response: any) => {
              /**
               * check the response body to match with the type
               */
              const _typeUser: TypeUser = response.body;
              /**
               * Find the index of the updated typeUser
               */
              const index = typeUsers.findIndex(
                (item) => item.id_type_user == typeUser.id_type_user
              );
              /**
               * Update the typeUser
               */
              typeUsers[index] = _typeUser;
              /**
               * Update the typeUsers
               */
              this._typeUsers.next(typeUsers);

              /**
               * Update the typeUser
               */
              this._typeUser.next(_typeUser);

              return of(_typeUser);
            })
          )
      )
    );
  }
  /**
   * delete
   * @param id_user_
   * @param id_type_user
   */
  delete(id_user_: string, id_type_user: string): Observable<any> {
    return this.typeUsers$.pipe(
      take(1),
      switchMap((typeUsers) =>
        this._httpClient
          .delete(this._url + `/delete`, {
            params: { id_user_, id_type_user },
          })
          .pipe(
            switchMap((response: any) => {
              if (response && response.body) {
                /**
                 * Find the index of the updated typeUser
                 */
                const index = typeUsers.findIndex(
                  (item) => item.id_type_user == id_type_user
                );
                /**
                 * Delete the object of array
                 */
                typeUsers.splice(index, 1);
                /**
                 * Update the typeUsers
                 */
                this._typeUsers.next(typeUsers);
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
