import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppInitialData } from 'app/core/app/app.type';
import { User } from 'app/modules/core/user/user.types';
import {
  addNavigationCompact,
  addNavigationDefault,
  addNavigationFuturistic,
  addNavigationHorizontal,
  addUser,
  deleteNavigationAll,
  deleteUser,
  disabledRememberMe,
  enabledRememberMe,
  resetInside,
  setInside,
} from 'app/store/global/global.actions';
import { GlobalUtils } from 'app/utils/GlobalUtils';
import { SecurityCap } from 'app/utils/SecurityCap';
import { environment } from 'environments/environment';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from './auth.utils';

@Injectable()
export class AuthService {
  data!: AppInitialData;

  private _authenticated: boolean = false;
  private inactive: boolean = false;
  private expiration_token: number = 180;

  private routes: BehaviorSubject<string[]> = new BehaviorSubject(['']);
  private othersRoutesAllow = ['/auth/sign-out', '/core/settings'];
  private allowRoutes: string[] = [''];

  private _url: string;
  private _headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  /**
   * Getter
   */
  get routes$(): Observable<any> {
    return this.routes.asObservable();
  }
  /**
   * Observable para activeSession
   */
  _activeSession: boolean = true;

  private activeSession: BehaviorSubject<boolean> = new BehaviorSubject(
    this._activeSession
  );

  get activeSession$(): Observable<boolean> {
    return this.activeSession.asObservable();
  }
  /**
   * Constructor
   */
  constructor(
    private _store: Store<{ global: AppInitialData }>,
    private _httpClient: HttpClient,
    private _securityCap: SecurityCap,
    private _globalUtils: GlobalUtils
  ) {
    this._url = environment.urlBackend + '/app/core/auth';
    this._store.subscribe((state) => {
      this.data = state.global;

      // Subscribe to generateRoutes for user
      const routes = this._globalUtils.generateRoutes(state.global.navigation);

      this.allowRoutes = routes.concat(this.othersRoutesAllow);
      this.routes.next(this.allowRoutes);
    });
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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(name_user: string): Observable<any> {
    // Renew token
    return this._httpClient
      .post(
        this._url + '/forgot-password',
        {
          name_user,
        },
        {
          headers: this._headers,
        }
      )
      .pipe(
        switchMap((response) => {
          // Return true
          return of(response);
        })
      );
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(name_user: string, password: string): Observable<boolean> {
    // Renew token
    return this._httpClient
      .post(
        this._url + '/reset-password',
        {
          name_user,
          password_user: this._securityCap.aesEncrypt(password),
        },
        {
          headers: this._headers,
        }
      )
      .pipe(
        switchMap(() => {
          // Return true
          return of(true);
        })
      );
  }

  /**
   * Sign in
   * @param credentials
   */
  signIn(credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
  }): Observable<boolean> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError(() => 'El usuario ya ha iniciado sesión.');
    }

    return this._httpClient
      .post(
        this._url + '/sign-in',
        {
          name_user: credentials.email,
          password_user: this._securityCap.aesEncrypt(credentials.password),
        },
        { headers: this._headers }
      )
      .pipe(
        switchMap((response: any) => {
          const body: AppInitialData = response.body;
          // Store the access token in the local storage
          this.accessToken = body.access_token!;

          // Set the authenticated flag to true
          this._authenticated = true;
          // set inside status
          this._store.dispatch(setInside());

          const _user: User = body.user;

          // Store the user on the user service
          this._store.dispatch(addUser(_user));

          // Store the RememberMe in the local storage
          if (credentials.rememberMe) {
            this._store.dispatch(
              enabledRememberMe({
                enabled: true,
                user: body.user.name_user,
                password: this._securityCap.aesEncrypt(credentials.password),
              })
            );
          } else {
            this._store.dispatch(disabledRememberMe());
          }
          // Set Navigation

          // defaultNavigation
          // compactNavigation
          // futuristicNavigation
          // horizontalNavigation

          if (body.navigation.defaultNavigation != undefined) {
            this._store.dispatch(
              addNavigationDefault(body.navigation.defaultNavigation)
            );
          }

          if (body.navigation.compactNavigation != undefined) {
            // Fill compact navigation children using the default navigation
            body.navigation.compactNavigation.forEach((compactNavItem) => {
              if (body.navigation.defaultNavigation != undefined) {
                body.navigation.defaultNavigation.forEach((defaultNavItem) => {
                  if (defaultNavItem.id === compactNavItem.id) {
                    compactNavItem.children = cloneDeep(
                      defaultNavItem.children
                    );
                  }
                });
              }
            });

            this._store.dispatch(
              addNavigationCompact(body.navigation.compactNavigation)
            );
          }

          if (body.navigation.futuristicNavigation != undefined) {
            this._store.dispatch(
              addNavigationFuturistic(body.navigation.futuristicNavigation)
            );
          }

          if (body.navigation.horizontalNavigation != undefined) {
            // Fill compact navigation children using the default navigation
            body.navigation.horizontalNavigation.forEach(
              (horizontalNavItem) => {
                if (body.navigation.defaultNavigation != undefined) {
                  body.navigation.defaultNavigation.forEach(
                    (defaultNavItem) => {
                      if (defaultNavItem.id === horizontalNavItem.id) {
                        horizontalNavItem.children = cloneDeep(
                          defaultNavItem.children
                        );
                      }
                    }
                  );
                }
              }
            );

            this._store.dispatch(
              addNavigationHorizontal(body.navigation.horizontalNavigation)
            );
          }

          // Return a new observable with the response
          return of(true);
        })
      );
  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<boolean> {
    /**
     * get the expiration_token
     */
    this.expiration_token = this.data.user.company.setting.expiration_token;
    /**
     * Renew token
     */
    return this._httpClient
      .post(
        this._url + '/refresh-access-token',
        {
          access_token: this.accessToken,
          expiration_token: this.expiration_token,
        },
        {
          headers: this._headers,
        }
      )
      .pipe(
        catchError(() => {
          // Return false
          return of(false);
        }),
        switchMap((response: any) => {
          if (!response) {
            return of(false);
          } else {
            const body: AppInitialData = response.body;
            // Store the access token in the local storage
            this.accessToken = body.access_token!;
            // Set the authenticated flag to true
            this._authenticated = true;
            // set inside status
            this._store.dispatch(setInside());
            // Return true
            return of(true);
          }
        })
      );
  }
  /**
   * Sign out
   */
  signOut(): Observable<boolean> {
    return this._httpClient
      .post(
        this._url + '/sign-out',
        {
          access_token: this.accessToken,
        },
        { headers: this._headers }
      )
      .pipe(
        catchError(() => {
          this.signOutReset();
          return of(false);
        }),
        switchMap(() => {
          this.signOutReset();
          return of(true);
        })
      );
  }
  /**
   * Sign out
   */
  signOutReset(): Observable<boolean> {
    // Remove the access token from the local storage
    localStorage.removeItem('access_token');
    // Set the authenticated flag to false
    this._authenticated = false;
    // Delete user of State
    this._store.dispatch(deleteUser());
    // Reset inside
    this._store.dispatch(resetInside());
    // Delete Navigation of state
    this._store.dispatch(deleteNavigationAll());
    // Delete others Objects of App

    // Return the observable
    return of(true);
  }
  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: {
    name: string;
    email: string;
    password: string;
    company: string;
  }): Observable<boolean> {
    return of(true);
    // return this._httpClient.post('core/auth/sign-up', user);
  }
  /**
   * unlockSession
   *
   * @param credentials
   */
  unlockSession(credentials: {
    name_user: string;
    password_user: string;
  }): Observable<boolean> {
    return this._httpClient
      .post(
        this._url + '/unlock-session',
        {
          name_user: credentials.name_user,
          password_user: this._securityCap.aesEncrypt(
            credentials.password_user
          ),
        },
        { headers: this._headers }
      )
      .pipe(
        switchMap((response: any) => {
          const body: AppInitialData = response.body;
          // Store the access token in the local storage
          this.accessToken = body.access_token!;

          // Set the authenticated flag to true
          this._authenticated = true;
          // set inside status
          this._store.dispatch(setInside());

          const _user: User = body.user;

          // Store the user on the user service
          this._store.dispatch(addUser(_user));

          // Return a new observable with the response
          return of(true);
        })
      );
  }
  /**
   * checkSession
   */
  checkSession(): Observable<boolean> {
    return this._httpClient
      .post(
        this._url + '/check-session',
        {
          access_token: this.accessToken,
        },
        { headers: this._headers }
      )
      .pipe(
        catchError((error) => {
          if (
            (error.error.code == '04-004' && error.error.component == 'auth') ||
            (error.error.code == '05-006' &&
              error.error.component == 'validations')
          ) {
            this.activeSession.next(false);
          }
          return of(false);
        }),
        switchMap(() => {
          this.activeSession.next(true);
          return of(true);
        })
      );
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }
    // Check if the user is inactive
    if (this.inactive) {
      return of(false);
    }
    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    // If the access token exists and it didn't expire, sign in using it
    return this.signInUsingToken();
  }
}
