import { AngelConfigService } from '@angel/services/config';
import { AngelMediaWatcherService } from '@angel/services/media-watcher';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  appConfig,
  AppConfig,
  Scheme,
  Theme,
  Themes,
} from 'app/core/app/app.config';
import { AppInitialData } from 'app/core/app/app.type';
import { AuthService } from 'app/core/auth/auth.service';
import { LayoutService } from 'app/layout/layout.service';
import { Layout } from 'app/layout/layout.types';
import { setAppConfig } from 'app/store/global/global.actions';
import { GlobalUtils } from 'app/utils/GlobalUtils';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styles: [
    `
      settings {
        position: static;
        display: block;
        flex: none;
        width: auto;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit, OnDestroy {
  havedQuickChat: boolean = false;

  isScreenSmall: boolean = false;

  data!: AppInitialData;

  config: AppConfig = appConfig;
  layout: Layout = 'empty';
  scheme: 'dark' | 'light' = 'light';
  theme: string = '';
  themes!: Themes;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  // length Navigations
  lengthDefault: number = 0;
  lengthCompact: number = 0;
  lengthFuturistic: number = 0;
  lengthHorizontal: number = 0;
  /**
   * Constructor
   */
  constructor(
    private _store: Store<{ global: AppInitialData }>,
    private _router: Router,
    private _globalUtils: GlobalUtils,
    private _layoutService: LayoutService,
    private _angelConfigService: AngelConfigService,
    private _authService: AuthService,
    private _angelMediaWatcherService: AngelMediaWatcherService
  ) {
    // Subscribe to user changes of state
    this._store.pipe(takeUntil(this._unsubscribeAll)).subscribe((state) => {
      this.data = state.global;
      /**
       * Check the navigation and stablished the length
       * lengthDefault Navigation
       */
      /**
       * Set the user preferences
       */

      if (state.global.inside) {
        this.lengthDefault = this._globalUtils.parseObjectToArray(
          this.data.navigation.defaultNavigation
        ).length;
        this.lengthCompact = this._globalUtils.parseObjectToArray(
          this.data.navigation.compactNavigation
        ).length;
        this.lengthFuturistic = this._globalUtils.parseObjectToArray(
          this.data.navigation.futuristicNavigation
        ).length;
        this.lengthHorizontal = this._globalUtils.parseObjectToArray(
          this.data.navigation.horizontalNavigation
        ).length;
      } else {
        setTimeout(() => {
          this.lengthDefault = 0;
          this.lengthCompact = 0;
          this.lengthFuturistic = 0;
          this.lengthHorizontal = 0;
        }, 0);
      }
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    /**
     * checkSession
     */
    this._authService
      .checkSession()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe();
    /**
     * checkSession
     */
    /**
     * Detect the QuickChat
     */
    this._layoutService.havedQuickChat$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_havedQuickChat) => {
        setTimeout(() => {
          this.havedQuickChat = _havedQuickChat;
        }, 0);
      });
    /**
     * Detect the QuickChat
     */
    // Subscribe to config changes
    this._angelConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: AppConfig) => {
        // Store the config
        this.config = config;
      });
    // Subscribe to media changes
    this._angelMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('sm');
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set the layout on the config
   * @param layout
   */
  setLayout(layout: string): void {
    // Clear the 'layout' query param to allow layout changes
    this._router
      .navigate([], {
        queryParams: {
          layout: null,
        },
        queryParamsHandling: 'merge',
      })
      .then(() => {
        // Set the config
        this._angelConfigService.config = { layout };
      });
  }
  /**
   * saveLayout
   */
  saveLayout(layout: string | any): void {
    this._store.dispatch(setAppConfig({ ...this.data.appConfig, layout }));
  }
  /**
   * Set the scheme on the config
   * @param scheme
   */
  setScheme(scheme: Scheme): void {
    this._angelConfigService.config = { scheme };
  }
  /**
   * saveScheme
   */
  saveScheme(scheme: Scheme): void {
    this._store.dispatch(setAppConfig({ ...this.data.appConfig, scheme }));
  }
  /**
   * Set the theme on the config
   * @param theme
   */
  setTheme(theme: Theme): void {
    this._angelConfigService.config = { theme };
  }
  /**
   * saveTheme
   */
  saveTheme(theme: Theme | any): void {
    this._store.dispatch(setAppConfig({ ...this.data.appConfig, theme }));
  }
}
