import {
  AngelNavigationItem,
  AngelNavigationService,
  AngelVerticalNavigationComponent,
} from '@angel/components/navigation';
import { AngelMediaWatcherService } from '@angel/services/media-watcher';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppData, appData } from 'app/core/app/app.data';
import { AppInitialData } from 'app/core/app/app.type';
import { LayoutService } from 'app/layout/layout.service';
import { GlobalUtils } from 'app/utils/GlobalUtils';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'thin-layout',
  templateUrl: './thin.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ThinLayoutComponent implements OnInit, OnDestroy {
  /**
   * Establecer en true si en el layout esta activado el chat
   */
  havedQuickChat: boolean = false;

  data!: AppInitialData;
  navigationCompact!: AngelNavigationItem[];
  _app_data: AppData = appData;

  isScreenSmall: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private store: Store<{ global: AppInitialData }>,
    private _globalUtils: GlobalUtils,
    private _layoutService: LayoutService,
    private _angelMediaWatcherService: AngelMediaWatcherService,
    private _angelNavigationService: AngelNavigationService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    /**
     * Set the QuickChat
     */
    this._layoutService.setQuickChat(this.havedQuickChat);
    /**
     * Set the QuickChat
     */
    // Subscribe to user changes of state
    this.store.pipe(takeUntil(this._unsubscribeAll)).subscribe((state) => {
      this.data = state.global;
      this.navigationCompact = this._globalUtils.parseObjectToArray(
        this.data.navigation.compactNavigation
      );
    });

    // Subscribe to media changes
    this._angelMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
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
   * Toggle navigation
   *
   * @param name
   */
  toggleNavigation(name: string): void {
    // Get the navigation
    const navigation =
      this._angelNavigationService.getComponent<AngelVerticalNavigationComponent>(
        name
      );

    if (navigation) {
      // Toggle the opened status
      navigation.toggle();
    }
  }
}
