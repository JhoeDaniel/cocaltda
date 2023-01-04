import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import local_Es_Ecuador from '@angular/common/locales/es-EC';
import locale_Es_Mexico from '@angular/common/locales/es-MX';
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
  throwError
} from 'rxjs';
import { session, sessions } from './session.data';
import { Session } from './session.types';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  /**
   * Locale
   */
  private _locale: string = '';

  set locale(value: string) {
    this._locale = value;
  }
  get locale(): string {
    return this._locale || 'es-EC';
  }

  registerCulture(culture: string) {
    if (!culture) {
      return;
    }
    this.locale = culture;

    // Register locale data since only the es-EC locale data comes with Angular
    switch (culture) {
      case 'es-EC': {
        registerLocaleData(local_Es_Ecuador);
        break;
      }
      case 'es-MX': {
        registerLocaleData(locale_Es_Mexico);
        break;
      }
    }
  }
  /**
   * Locale
   */

  private _url: string;
  private _headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private _session: BehaviorSubject<Session> = new BehaviorSubject(session);
  private _sessions: BehaviorSubject<Session[]> = new BehaviorSubject(sessions);

  constructor(private _httpClient: HttpClient) {
    this._url = environment.urlBackend + '/app/core/session';
  }
  /**
   * Getter
   */
  get session$(): Observable<Session> {
    return this._session.asObservable();
  }
  /**
   * Getter for _sessions
   */
  get sessions$(): Observable<Session[]> {
    return this._sessions.asObservable();
  }
  /**
   * queryRead
   * @param query
   */
  queryRead(query: string): Observable<Session[]> {
    return this._httpClient
      .get<Session[]>(this._url + `/queryRead/${query ? query : '*'}`)
      .pipe(
        tap((sessions: Session[]) => {
          if (sessions) {
            this._sessions.next(sessions);
          } else {
            this._sessions.next([]);
          }
        })
      );
  }
  /**
   * byUserQueryRead
   * @param id_user
   * @param query
   */
  byUserQueryRead(id_user: string, query: string): Observable<Session[]> {
    return this._httpClient
      .get<Session[]>(
        this._url + `/byUserQueryRead/${id_user}/${query ? query : '*'}`
      )
      .pipe(
        tap((sessions: Session[]) => {
          if (sessions) {
            this._sessions.next(sessions);
          } else {
            this._sessions.next([]);
          }
        })
      );
  }
  /**
   * specificRead
   * @param id_session
   */
  specificRead(id_session: string): Observable<Session> {
    return this._httpClient
      .get<Session>(this._url + `/specificRead/${id_session}`)
      .pipe(
        tap((sessions: Session) => {
          this._session.next(session);
          return sessions;
        })
      );
  }
  /**
   * specificReadInLocal
   */
  specificReadInLocal(id_session: string): Observable<Session> {
    return this._sessions.pipe(
      take(1),
      map((sessions) => {
        /**
         * Find
         */
        const session =
          sessions.find((item) => item.id_session == id_session) || null;
        /**
         * Update
         */
        this._session.next(session!);
        /**
         * Return
         */
        return session;
      }),
      switchMap((session) => {
        if (!session) {
          return throwError(
            () => 'No se encontro el elemento con el id ' + id_session + '!'
          );
        }
        return of(session);
      })
    );
  }
  /**
   * bySessionRelease
   * @param id_user_ that will be updated
   * @param session
   */
  bySessionRelease(session: Session | any): Observable<any> {
    return this.sessions$.pipe(
      take(1),
      switchMap((sessions) =>
        this._httpClient
          .patch(this._url + '/bySessionRelease', session, {
            headers: this._headers,
          })
          .pipe(
            switchMap((response: any) => {
              /**
               * check the response body to match with the type
               */
              const _session: Session = response.body;
              /**
               * Find the index of the updated session
               */
              const index = sessions.findIndex(
                (item) => item.id_session == session.id_session
              );
              /**
               * Update the session
               */
              sessions[index] = _session;
              /**
               * Update the sessions
               */
              this._sessions.next(sessions);

              /**
               * Update the session
               */
              this._session.next(_session);

              return of(_session);
            })
          )
      )
    );
  }
  /**
   * byUserReleaseAll
   * @param id_user_ that will be updated
   * @param session
   */
  byUserReleaseAll(session: Session | any): Observable<any> {
    return this.sessions$.pipe(
      take(1),
      switchMap((sessions) =>
        this._httpClient
          .patch(this._url + '/byUserReleaseAll', session, {
            headers: this._headers,
          })
          .pipe(
            switchMap((response: any) => {
              /**
               * Find sessions of company
               */
              let session_users = sessions.filter(
                (item: any) => item.user.id_user == session.user.id_user
              );

              session_users.map((item: any, index: number) => {
                session_users[index] = {
                  ...item,
                  status_session: false,
                  date_sign_out_session: new Date(),
                };
              });
              /**
               * Update the sessions
               */
              this._sessions.next(session_users);

              return of(response);
            })
          )
      )
    );
  }
  /**
   * byCompanyReleaseAll
   * @param id_user_ that will be updated
   * @param session
   */
  byCompanyReleaseAll(session: Session | any): Observable<any> {
    return this.sessions$.pipe(
      take(1),
      switchMap((sessions) =>
        this._httpClient
          .patch(this._url + '/byCompanyReleaseAll', session, {
            headers: this._headers,
          })
          .pipe(
            switchMap((response: any) => {
              /**
               * Find sessions of company
               */
              let session_company = sessions.filter(
                (item: any) =>
                  item.user.company.id_company ==
                  session.user.company.id_company
              );

              session_company.map((item: any, index: number) => {
                session_company[index] = {
                  ...item,
                  status_session: false,
                  date_sign_out_session: new Date(),
                };
              });
              /**
               * Update the sessions
               */
              this._sessions.next(session_company);

              return of(response);
            })
          )
      )
    );
  }
}
