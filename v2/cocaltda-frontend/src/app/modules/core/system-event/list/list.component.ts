import { AngelMediaWatcherService } from '@angel/services/media-watcher';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppInitialData } from 'app/core/app/app.type';
import { AuthService } from 'app/core/auth/auth.service';
import { LayoutService } from 'app/layout/layout.service';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SystemEventService } from '../system-event.service';
import { SystemEvent } from '../system-event.types';

@Component({
  selector: 'system-event-list',
  templateUrl: './list.component.html',
})
export class SystemEventListComponent implements OnInit {
  @ViewChild('matDrawer', { static: true }) matDrawer!: MatDrawer;
  count: number = 0;
  systemEvents$!: Observable<SystemEvent[]>;
  contentLoaded: boolean = false;

  _urlPathAvatar: string = environment.urlBackend + '/resource/img/avatar/';

  openMatDrawer: boolean = false;

  private data!: AppInitialData;

  drawerMode!: 'side' | 'over';
  searchInputControl: FormControl = new FormControl();
  selectedSystemEvent!: SystemEvent;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  /**
   * isOpenModal
   */
  isOpenModal: boolean = false;
  /**
   * isOpenModal
   */
  constructor(
    private _store: Store<{ global: AppInitialData }>,
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _angelMediaWatcherService: AngelMediaWatcherService,
    private _systemEventService: SystemEventService,
    private _layoutService: LayoutService,
    private _authService: AuthService
  ) {}

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
     * isOpenModal
     */
    this._layoutService.isOpenModal$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_isOpenModal: boolean) => {
        this.isOpenModal = _isOpenModal;
      });
    /**
     * isOpenModal
     */
    /**
     * Subscribe to user changes of state
     */
    this._store.pipe(takeUntil(this._unsubscribeAll)).subscribe((state) => {
      this.data = state.global;
    });
    /**
     * Get the systemEvents
     */
    this.systemEvents$ = this._systemEventService.systemEvents$;
    /**
     *  queryRead *
     */
    this._systemEventService
      .queryRead('*')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((systemEvents: SystemEvent[]) => {
        this.contentLoaded = true;
        /**
         * Update the counts
         */
        this.count = systemEvents.length;
        /**
         * Mark for check
         */
        this._changeDetectorRef.markForCheck();
      });
    /**
     *  Count Subscribe
     */
    this._systemEventService.systemEvents$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((systemEvents: SystemEvent[]) => {
        /**
         * Update the counts
         */
        this.count = systemEvents.length;
        /**
         * Mark for check
         */
        this._changeDetectorRef.markForCheck();
      });
    /**
     * Subscribe to search input field value changes
     */
    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        switchMap((query) => {
          /**
           * Search
           */
          return this._systemEventService.queryRead(query.toLowerCase());
        })
      )
      .subscribe();
    /**
     * Subscribe to media changes
     */
    this._angelMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        /**
         * Set the drawerMode if the given breakpoint is active
         */
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
        } else {
          this.drawerMode = 'over';
        }
        /**
         * Mark for check
         */
        this._changeDetectorRef.markForCheck();
      });
    /**
     * Subscribe to MatDrawer opened change
     */
    this.matDrawer.openedChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((opened) => {
        this.openMatDrawer = opened;
        if (!opened) {
          /**
           * Remove the selected when drawer closed
           */
          this.selectedSystemEvent = null!;
          /**
           * Mark for check
           */
          this._changeDetectorRef.markForCheck();
        }
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    /**
     * Unsubscribe from all subscriptions
     */
    this._unsubscribeAll.next(0);
    this._unsubscribeAll.complete();
  }

  /** ----------------------------------------------------------------------------------------------------- */
  /** @ Public methods
   /** ----------------------------------------------------------------------------------------------------- */

  /**
   * Go to system_event
   * @param id_system_event
   */
  goToEntity(id_system_event: string): void {
    /**
     * Get the current activated route
     */
    let route = this._activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    /**
     * Go to system_event
     */
    this._router.navigate(
      [this.openMatDrawer ? '../' : './', id_system_event],
      { relativeTo: route }
    );
    /**
     * Mark for check
     */
    this._changeDetectorRef.markForCheck();
  }
  /**
   * On backdrop clicked
   */
  onBackdropClicked(): void {
    /**
     * Get the current activated route
     */
    let route = this._activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    /**
     * Go to the parent route
     */
    this._router.navigate(['../'], { relativeTo: route });
    /**
     * Mark for check
     */
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Track by function for ngFor loops
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
