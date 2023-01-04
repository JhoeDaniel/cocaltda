import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private _url: string = '';
  private _headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private _httpClient: HttpClient) {
    this._url = environment.urlBackend + '/app/public/auth';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  get accessToken(): string {
    return localStorage.getItem('access_token') ?? '';
  }

  /**
   * Sign in
   * @param name_user
   * @param password_user
   */
  signIn(name_user: string, password_user: string): Observable<any> {
    return this._httpClient
      .post(
        this._url + '/sign-in',
        {
          name_user,
          password_user,
        },
        { headers: this._headers }
      )
      .pipe(
        switchMap((response: any) => {
          /**
           * Store the access token in the local storage
           */
          this.accessToken = response.body;

          return of(response);
        })
      );
  }
}
