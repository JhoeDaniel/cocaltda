import { angelAnimations } from '@angel/animations';
import { AngelAlertType } from '@angel/components/alert';
import {
  ActionAngelConfirmation,
  AngelConfirmationService,
} from '@angel/services/confirmation';
import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { AppInitialData, MessageAPI } from 'app/core/app/app.type';
import { LayoutService } from 'app/layout/layout.service';
import { NotificationService } from 'app/shared/notification/notification.service';
import { Subject, takeUntil } from 'rxjs';
import { user } from '../../user/user.data';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.types';
import { SessionListComponent } from '../list/list.component';
import { SessionService } from '../session.service';
import { Session } from '../session.types';

@Component({
  selector: 'session-details',
  templateUrl: './details.component.html',
  animations: angelAnimations,
})
export class SessionDetailsComponent implements OnInit {
  listUser: User[] = [];
  selectedUser: User = user;
  id_company: string = '';
  nameEntity: string = 'Sesión';
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
  session!: Session;
  sessionForm!: FormGroup;
  private sessions!: Session[];

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
    private _sessionListComponent: SessionListComponent,
    private _sessionService: SessionService,
    private _formBuilder: FormBuilder,
    private _layoutService: LayoutService,
    private _userService: UserService,
    private _angelConfirmationService: AngelConfirmationService,
    private _notificationService: NotificationService
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
    this._sessionListComponent.matDrawer.open();
    /**
     * Create the session form
     */
    this.sessionForm = this._formBuilder.group({
      id_session: [''],
      id_user: [''],
      host_session: ['', [Validators.required]],
      agent_session: ['', [Validators.required]],
      date_sign_in_session: ['', [Validators.required]],
      date_sign_out_session: ['', [Validators.required]],
      status_session: ['', [Validators.required]],
    });
    /**
     * Get the sessions
     */
    this._sessionService.sessions$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((sessions: Session[]) => {
        this.sessions = sessions;
        /**
         * Mark for check
         */
        this._changeDetectorRef.markForCheck();
      });
    /**
     * Get the session
     */
    this._sessionService.session$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((session: Session) => {
        /**
         * Open the drawer in case it is closed
         */
        this._sessionListComponent.matDrawer.open();
        /**
         * Get the session
         */
        this.session = session;

        // User
        this._userService
          .byCompanyQueryRead(this.id_company, '*')
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((users: User[]) => {
            this.listUser = users;

            this.selectedUser = this.listUser.find(
              (item) => item.id_user == this.session.user.id_user.toString()
            )!;
          });

        /**
         * Patch values to the form
         */
        this.patchForm();
        /**
         * Mark for check
         */
        this._changeDetectorRef.markForCheck();
      });
  }
  /**
   * Pacth the form with the information of the database
   */
  patchForm(): void {
    this.sessionForm.patchValue({
      ...this.session,
      id_user: this.session.user.id_user,
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
   * bySessionRelease
   */
  bySessionRelease() {
    this._angelConfirmationService
      .open({
        title: 'Cerrar sesión',
        message:
          '¿Estás seguro de que deseas cerrar esta session? ¡Esta acción no se puede deshacer!',
      })
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((confirm: ActionAngelConfirmation) => {
        if (confirm === 'confirmed') {
          const id_user_ = this.data.user.id_user;

          let sesion = {
            id_user_: parseInt(id_user_),
            id_session: parseInt(this.session.id_session),
          };
          /**
           * Create the sesiones
           */
          this._sessionService
            .bySessionRelease(sesion)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
              next: (_session: Session) => {
                if (_session) {
                  this._notificationService.success(
                    'Sesión finalizada correctamente'
                  );
                } else {
                  this._notificationService.error(
                    '¡Error interno!, consulte al administrador.'
                  );
                }
              },
              error: (error: { error: MessageAPI }) => {
                this._notificationService.error(
                  !error.error
                    ? '¡Error interno!, consulte al administrador.'
                    : !error.error.description
                    ? '¡Error interno!, consulte al administrador.'
                    : error.error.description
                );
              },
            });
        }
        this._layoutService.setOpenModal(false);
      });
  }
  /**
   * Close the drawer
   */
  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._sessionListComponent.matDrawer.close();
  }
  /**
   * parseJsonToText
   * @returns
   */
  parseJsonToText(json: any) {
    return JSON.stringify(json, null, 2);
  }
}
