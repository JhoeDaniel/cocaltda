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
import { profile, profiles } from './profile.data';
import { Profile } from './profile.types';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _url: string;
  private _headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private _profile: BehaviorSubject<Profile> = new BehaviorSubject(profile);
  private _profiles: BehaviorSubject<Profile[]> = new BehaviorSubject(profiles);

  constructor(private _httpClient: HttpClient) {
    this._url = environment.urlBackend + '/app/core/profile';
  }
  /**
   * Getter
   */
  get profile$(): Observable<Profile> {
    return this._profile.asObservable();
  }
  /**
   * Getter for _profiles
   */
  get profiles$(): Observable<Profile[]> {
    return this._profiles.asObservable();
  }
  /**
   * create
   */
  create(id_user_: string, id_company: string): Observable<any> {
    return this._profiles.pipe(
      take(1),
      switchMap((profiles) =>
        this._httpClient
          .post(
            this._url + '/create',
            {
              id_user_: parseInt(id_user_),
              company: {
                id_company: parseInt(id_company),
              },
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
              const _profile: Profile = response.body;
              /**
               * Update the profile in the store
               */
              this._profiles.next([_profile, ...profiles]);

              return of(_profile);
            })
          )
      )
    );
  }
  /**
   * queryRead
   * @param query
   */
  queryRead(query: string): Observable<Profile[]> {
    return this._httpClient
      .get<Profile[]>(this._url + `/queryRead/${query ? query : '*'}`)
      .pipe(
        tap((profiles: Profile[]) => {
          if (profiles) {
            this._profiles.next(profiles);
          } else {
            this._profiles.next([]);
          }
        })
      );
  }
  /**
   * byCompanyQueryRead
   * @param id_company
   * @param query
   */
  byCompanyQueryRead(id_company: string, query: string): Observable<Profile[]> {
    return this._httpClient
      .get<Profile[]>(
        this._url + `/byCompanyQueryRead/${id_company}/${query ? query : '*'}`
      )
      .pipe(
        tap((profiles: Profile[]) => {
          if (profiles) {
            this._profiles.next(profiles);
          } else {
            this._profiles.next([]);
          }
        })
      );
  }
  /**
   * specificRead
   * @param id_profile
   */
  specificRead(id_profile: string): Observable<Profile> {
    return this._httpClient
      .get<Profile>(this._url + `/specificRead/${id_profile}`)
      .pipe(
        tap((profiles: Profile) => {
          this._profile.next(profile);
          return profiles;
        })
      );
  }
  /**
   * specificReadInLocal
   */
  specificReadInLocal(id_profile: string): Observable<Profile> {
    return this._profiles.pipe(
      take(1),
      map((profiles) => {
        /**
         * Find
         */
        const profile =
          profiles.find((item) => item.id_profile == id_profile) || null;
        /**
         * Update
         */
        this._profile.next(profile!);
        /**
         * Return
         */
        return profile;
      }),
      switchMap((profile) => {
        if (!profile) {
          return throwError(
            () => 'No se encontro el elemento con el id ' + id_profile + '!'
          );
        }
        return of(profile);
      })
    );
  }
  /**
   * update
   * @param profile
   */
  update(profile: Profile): Observable<any> {
    return this.profiles$.pipe(
      take(1),
      switchMap((profiles) =>
        this._httpClient
          .patch(this._url + '/update', profile, {
            headers: this._headers,
          })
          .pipe(
            switchMap((response: any) => {
              /**
               * check the response body to match with the type
               */
              const _profile: Profile = response.body;
              /**
               * Find the index of the updated profile
               */
              const index = profiles.findIndex(
                (item) => item.id_profile == profile.id_profile
              );
              /**
               * Update the profile
               */
              profiles[index] = _profile;
              /**
               * Update the profiles
               */
              this._profiles.next(profiles);

              /**
               * Update the profile
               */
              this._profile.next(_profile);

              return of(_profile);
            })
          )
      )
    );
  }
  /**
   * delete
   * @param id_user_
   * @param id_profile
   */
  delete(id_user_: string, id_profile: string): Observable<any> {
    return this.profiles$.pipe(
      take(1),
      switchMap((profiles) =>
        this._httpClient
          .delete(this._url + `/delete`, {
            params: { id_user_, id_profile },
          })
          .pipe(
            switchMap((response: any) => {
              if (response && response.body) {
                /**
                 * Find the index of the updated profile
                 */
                const index = profiles.findIndex(
                  (item) => item.id_profile == id_profile
                );
                /**
                 * Delete the object of array
                 */
                profiles.splice(index, 1);
                /**
                 * Update the profiles
                 */
                this._profiles.next(profiles);
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
