import { angelAnimations } from '@angel/animations';
import { AngelAlertType } from '@angel/components/alert';
import { AngelConfirmationService } from '@angel/services/confirmation';
import { OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppInitialData } from 'app/core/app/app.type';
import { LayoutService } from 'app/layout/layout.service';
import { NotificationService } from 'app/shared/notification/notification.service';
import { filter, fromEvent, merge, Subject, takeUntil } from 'rxjs';
import { user } from '../../user/user.data';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.types';
import { SystemEventListComponent } from '../list/list.component';
import { SystemEventService } from '../system-event.service';
import { SystemEvent } from '../system-event.types';

@Component({
  selector: 'system-event-details',
  templateUrl: './details.component.html',
  animations: angelAnimations,
})
export class SystemEventDetailsComponent implements OnInit {
  listUser: User[] = [];
  selectedUser: User = user;
  id_company: string = '';
  nameEntity: string = 'Evento del sistema';
  private data!: AppInitialData;

  editMode: boolean = false;
  /**
   * Alert
   */
  alert: { type: AngelAlertType; message: string } = {
    type: 'error',
    message: '',
  };
  showAlert: boolean = false;
  /**
   * Alert
   */
  systemEvent!: SystemEvent;
  systemEventForm!: FormGroup;
  private systemEvents!: SystemEvent[];

  private _tagsPanelOverlayRef!: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  /**
   * isOpenModal
   */
  isOpenModal: boolean = false;
  /**
   * isOpenModal
   */
  /**
   * Constructor
   */
  constructor(
    private _store: Store<{ global: AppInitialData }>,
    private _changeDetectorRef: ChangeDetectorRef,
    private _systemEventListComponent: SystemEventListComponent,
    private _systemEventService: SystemEventService,
    @Inject(DOCUMENT) private _document: any,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _notificationService: NotificationService,
    private _angelConfirmationService: AngelConfirmationService,
    private _layoutService: LayoutService,
    private _userService: UserService
  ) {}

  /** ----------------------------------------------------------------------------------------------------- */
  /** @ Lifecycle hooks
	  /** ----------------------------------------------------------------------------------------------------- */

  /**
   * On init
   */
  ngOnInit(): void {
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
      this.id_company = this.data.user.company.id_company;
    });
    /**
     * Open the drawer
     */
    this._systemEventListComponent.matDrawer.open();
    /**
     * Create the systemEvent form
     */
    this.systemEventForm = this._formBuilder.group({
      id_system_event: [''],
      id_user: [''],
      table_system_event: ['', [Validators.required, Validators.maxLength(50)]],
      row_system_event: ['', [Validators.required, Validators.maxLength(10)]],
      action_system_event: [
        '',
        [Validators.required, Validators.maxLength(50)],
      ],
      date_system_event: ['', [Validators.required]],
    });
    /**
     * Get the systemEvents
     */
    this._systemEventService.systemEvents$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((systemEvents: SystemEvent[]) => {
        this.systemEvents = systemEvents;
        /**
         * Mark for check
         */
        this._changeDetectorRef.markForCheck();
      });
    /**
     * Get the systemEvent
     */
    this._systemEventService.systemEvent$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((systemEvent: SystemEvent) => {
        /**
         * Open the drawer in case it is closed
         */
        this._systemEventListComponent.matDrawer.open();
        /**
         * Get the systemEvent
         */
        this.systemEvent = systemEvent;

        // User
        this._userService
          .byCompanyQueryRead(this.id_company, '*')
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((users: User[]) => {
            this.listUser = users;

            this.selectedUser = this.listUser.find(
              (item) => item.id_user == this.systemEvent.user.id_user.toString()
            )!;
          });

        /**
         * Patch values to the form
         */
        this.patchForm();
        /**
         * Toggle the edit mode off
         */
        this.toggleEditMode(false);
        /**
         * Mark for check
         */
        this._changeDetectorRef.markForCheck();
      });
    /**
     * Shortcuts
     */
    merge(
      fromEvent(this._document, 'keydown').pipe(
        takeUntil(this._unsubscribeAll),
        filter<KeyboardEvent | any>((e) => e.key === 'Escape')
      )
    )
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((keyUpOrKeyDown) => {
        /**
         * Shortcut Escape
         */
        if (!this.isOpenModal && keyUpOrKeyDown.key == 'Escape') {
          /**
           * Navigate parentUrl
           */
          const parentUrl = this._router.url.split('/').slice(0, -1).join('/');
          this._router.navigate([parentUrl]);
          /**
           * Close Drawer
           */
          this.closeDrawer();
        }
      });
    /**
     * Shortcuts
     */
  }
  /**
   * Pacth the form with the information of the database
   */
  patchForm(): void {
    this.systemEventForm.patchValue({
      ...this.systemEvent,
      id_user: this.systemEvent.user.id_user,
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
    /**
     * Dispose the overlays if they are still on the DOM
     */
    if (this._tagsPanelOverlayRef) {
      this._tagsPanelOverlayRef.dispose();
    }
  }

  /** ----------------------------------------------------------------------------------------------------- */
  /** @ Public methods
	  /** ----------------------------------------------------------------------------------------------------- */

  /**
   * Close the drawer
   */
  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._systemEventListComponent.matDrawer.close();
  }
  /**
   * Toggle edit mode
   * @param editMode
   */
  toggleEditMode(editMode: boolean | null = null): void {
    this.patchForm();

    if (editMode === null) {
      this.editMode = !this.editMode;
    } else {
      this.editMode = editMode;
    }
    /**
     * Mark for check
     */
    this._changeDetectorRef.markForCheck();
  }
}
