import { AngelConfigService } from '@angel/services/config';
import { AngelConfirmationService } from '@angel/services/confirmation';
import { AngelMediaWatcherService } from '@angel/services/media-watcher';
import { ANGEL_VERSION } from '@angel/version';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { appConfig, AppConfig, Scheme, Theme } from 'app/core/app/app.config';
import { AppInitialData } from 'app/core/app/app.type';
import { AuthService } from 'app/core/auth/auth.service';
import {
  Layout,
  _navegacionCompact,
  _navegacionDefault,
  _navegacionFuturistic,
  _navegacionHorizontal,
} from 'app/layout/layout.types';
import { setInactive } from 'app/store/global/global.actions';
import { GlobalUtils } from 'app/utils/GlobalUtils';
import { combineLatest, filter, map, Subject, takeUntil } from 'rxjs';
import { SettingsCenterService } from './common/settings-center/settings-center.service';
import { LayoutService } from './layout.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit, OnDestroy {
  havedQuickChat: boolean = false;

  data!: AppInitialData;
  timeApplyLayout: number = 0;

  config: AppConfig = appConfig;
  layout: Layout = 'empty';
  scheme: 'dark' | 'light' = 'light';
  theme: string = '';
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  // User inactive
  userActivity: any;
  userInactive: Subject<boolean> = new Subject();

  // length Navigations
  lengthDefault: number = 0;
  lengthCompact: number = 0;
  lengthFuturistic: number = 0;
  lengthHorizontal: number = 0;

  navegacions: Layout[] = [];

  /**
   * Constructor
   */
  constructor(
    private _store: Store<{ global: AppInitialData }>,
    private _activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private _document: any,
    private _renderer2: Renderer2,
    private _authService: AuthService,
    private _layoutService: LayoutService,
    private _router: Router,
    private _angelConfigService: AngelConfigService,
    private _angelMediaWatcherService: AngelMediaWatcherService,
    private _globalUtils: GlobalUtils,
    private _angelConfirmationService: AngelConfirmationService,
    private _settingsCenterService: SettingsCenterService
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
      this.setScheme(this.data.appConfig.scheme);
      // V2
      // this.setTheme(this.data.appConfig.theme);
      this.setTheme('theme-green');

      if (this.data.inside) {
        /**
         * Restablecer las navegaciones disponibles
         */
        this.navegacions = ['empty'];
        /**
         * Contar las navegaciones que viene en el store
         */
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

        /**
         * Construimos las navegaciones a las que el usuario puede acceder
         */
        if (this.lengthDefault >= 1) {
          this.navegacions = [...this.navegacions, ..._navegacionDefault];
        }

        if (this.lengthCompact >= 1) {
          this.navegacions = [...this.navegacions, ..._navegacionCompact];
        }

        if (this.lengthFuturistic >= 1) {
          this.navegacions = [...this.navegacions, ..._navegacionFuturistic];
        }

        if (this.lengthHorizontal >= 1) {
          this.navegacions = [...this.navegacions, ..._navegacionHorizontal];
        }
        /**
         * Haved navegation Default or Compact or Futuristic or Horizontal
         */
        if (this.lengthDefault >= 1) {
          setTimeout(() => {
            const navegacion = this.navegacions.find(
              (item) => item == this.data.appConfig.layout
            );

            if (navegacion) {
              this.setLayout(navegacion);
            } else {
              this.setLayout('classy'); // classic or classy
            }
          }, this.timeApplyLayout);
        } else if (this.lengthCompact >= 1) {
          setTimeout(() => {
            const navegacion = this.navegacions.find(
              (item) => item == this.data.appConfig.layout
            );

            if (navegacion) {
              this.setLayout(navegacion);
            } else {
              this.setLayout('dense'); // compact or dense or thin
            }
          }, this.timeApplyLayout);
        } else if (this.lengthFuturistic >= 1) {
          setTimeout(() => {
            const navegacion = this.navegacions.find(
              (item) => item == this.data.appConfig.layout
            );

            if (navegacion) {
              this.setLayout(navegacion);
            } else {
              this.setLayout('futuristic'); // futuristic
            }
          }, this.timeApplyLayout);
        } else if (this.lengthHorizontal >= 1) {
          setTimeout(() => {
            const navegacion = this.navegacions.find(
              (item) => item == this.data.appConfig.layout
            );

            if (navegacion) {
              this.setLayout(navegacion);
            } else {
              this.setLayout('centered'); // centered or enterprise or material or modern
            }
          }, this.timeApplyLayout);
        }
        // this.setTimeout();
      } else {
        setTimeout(() => {
          this.lengthDefault = 0;
          this.lengthCompact = 0;
          this.lengthFuturistic = 0;
          this.lengthHorizontal = 0;
        }, 0);
      }
    });
    this.userInactive.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      this._authService
        .check()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((_isAuth) => {
          if (_isAuth) {
            this._store.dispatch(setInactive());

            // console.log(
            //   `Usuario inactivo por ${
            //     environment.timeInactivity / 1000
            //   } segundos`
            // );

            // Close all modals opened
            this._angelConfirmationService.closeAll();

            // Redirect for inactivity
            const redirectURL =
              this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
              'auth/unlock-session';

            // Navigate to the redirect url
            this._router.navigateByUrl(redirectURL);
          }
        });
    });
  }
  setTimeout() {
    this.userActivity = setTimeout(
      () => this.userInactive.next(false),
      this.data.user.company.setting.inactivity_time * 1000
    );
  }

  @HostListener('window:mousemove') refreshUserState() {
    /**
     * Solo si el usuario esta logueado
     */
    if (this.data.inside) {
      clearTimeout(this.userActivity);
      this.setTimeout();
    }
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    /**
     * Subscribe activeSession
     */
    this._authService.activeSession$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((activeSession: boolean) => {
        if (!activeSession) {
          // Close all modals opened
          this._angelConfirmationService.closeAll();
          this._router.navigate(['auth/sign-out']);
        }
      });
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
    // Set the theme and scheme based on the configuration
    combineLatest([
      this._angelConfigService.config$,
      this._angelMediaWatcherService.onMediaQueryChange$([
        '(prefers-color-scheme: dark)',
        '(prefers-color-scheme: light)',
      ]),
    ])
      .pipe(
        takeUntil(this._unsubscribeAll),
        map(([config, mql]) => {
          const options = {
            scheme: config.scheme,
            theme: config.theme,
          };

          // If the scheme is set to 'auto'...
          if (config.scheme === 'auto') {
            // Decide the scheme using the media query
            options.scheme = mql.breakpoints['(prefers-color-scheme: dark)']
              ? 'dark'
              : 'light';
          }

          return options;
        })
      )
      .subscribe((options) => {
        // Store the options
        this.scheme = options.scheme;
        this.theme = options.theme;

        // Update the scheme and theme
        this._updateScheme();
        this._updateTheme();
      });

    // Subscribe to config changes
    this._angelConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: AppConfig) => {
        // Store the config
        this.config = config;

        // Update the layout
        this._updateLayout();
      });

    // Subscribe to NavigationEnd event
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        // Update the layout
        this._updateLayout();
      });

    // Set the app version
    this._renderer2.setAttribute(
      this._document.querySelector('[ng-version]'),
      'angel-version',
      ANGEL_VERSION
    );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    clearTimeout(this.userActivity);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set the layout on the config
   *
   * @param layout
   */
  setLayout(layout: string | any): void {
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
   * Set the scheme on the config
   *
   * @param scheme
   */
  setScheme(scheme: Scheme): void {
    this._angelConfigService.config = { scheme };
  }
  /**
   * Set the theme on the config
   *
   * @param theme
   */
  setTheme(theme: Theme): void {
    this._angelConfigService.config = { theme };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Update the selected layout
   */
  private _updateLayout(): void {
    // Get the current activated route
    let route = this._activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    // 1. Set the layout from the config
    this.layout = this.config.layout;

    // 2. Get the query parameter from the current route and
    // set the layout and save the layout to the config
    const layoutFromQueryParam = route.snapshot.queryParamMap.get(
      'layout'
    ) as Layout;
    if (layoutFromQueryParam) {
      this.layout = layoutFromQueryParam;
      if (this.config) {
        this.config.layout = layoutFromQueryParam;
      }
    }

    // 3. Iterate through the paths and change the layout as we find
    // a config for it.
    //
    // The reason we do this is that there might be empty grouping
    // paths or componentless routes along the path. Because of that,
    // we cannot just assume that the layout configuration will be
    // in the last path's config or in the first path's config.
    //
    // So, we get all the paths that matched starting from root all
    // the way to the current activated route, walk through them one
    // by one and change the layout as we find the layout config. This
    // way, layout configuration can live anywhere within the path and
    // we won't miss it.
    //
    // Also, this will allow overriding the layout in any time so we
    // can have different layouts for different routes.
    const paths = route.pathFromRoot;
    paths.forEach((path) => {
      // Check if there is a 'layout' data
      if (
        path.routeConfig &&
        path.routeConfig.data &&
        path.routeConfig.data.layout
      ) {
        // Set the layout
        this.layout = path.routeConfig.data.layout;
      }
    });
  }

  /**
   * Update the selected scheme
   *
   * @private
   */
  private _updateScheme(): void {
    // Remove class names for all schemes
    this._document.body.classList.remove('light', 'dark');

    // Add class name for the currently selected scheme
    this._document.body.classList.add(this.scheme);
  }

  /**
   * Update the selected theme
   *
   * @private
   */
  private _updateTheme(): void {
    // Find the class name for the previously selected theme and remove it
    this._document.body.classList.forEach((className: string) => {
      if (className.startsWith('theme-')) {
        this._document.body.classList.remove(
          className,
          className.split('-')[1]
        );
      }
    });

    // Add class name for the currently selected theme
    this._document.body.classList.add(this.theme);
  }

  openDrawerSettings() {
    this._settingsCenterService.openDrawerSettings();
  }
}
