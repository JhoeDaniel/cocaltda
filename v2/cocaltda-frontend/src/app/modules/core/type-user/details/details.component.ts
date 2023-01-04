import { angelAnimations } from '@angel/animations';
import { AngelAlertType } from '@angel/components/alert';
import {
  ActionAngelConfirmation,
  AngelConfirmationService,
} from '@angel/services/confirmation';
import { OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppInitialData, MessageAPI } from 'app/core/app/app.type';
import { LayoutService } from 'app/layout/layout.service';
import { NotificationService } from 'app/shared/notification/notification.service';
import { filter, fromEvent, merge, Subject, takeUntil } from 'rxjs';
import { CompanyService } from '../../company/company.service';
import { profile } from '../../profile/profile.data';
import { ProfileService } from '../../profile/profile.service';
import { Profile } from '../../profile/profile.types';
import { TypeUserListComponent } from '../list/list.component';
import { TypeUserService } from '../type-user.service';
import { TypeUser } from '../type-user.types';

@Component({
  selector: 'type-user-details',
  templateUrl: './details.component.html',
  animations: angelAnimations,
})
export class TypeUserDetailsComponent implements OnInit {
  listProfile: Profile[] = [];
  selectedProfile: Profile = profile;
  id_company: string = '';
  nameEntity: string = 'Tipo de usuario';
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
  typeUser!: TypeUser;
  typeUserForm!: FormGroup;
  private typeUsers!: TypeUser[];

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
    private _typeUserListComponent: TypeUserListComponent,
    private _typeUserService: TypeUserService,
    @Inject(DOCUMENT) private _document: any,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _notificationService: NotificationService,
    private _angelConfirmationService: AngelConfirmationService,
    private _layoutService: LayoutService,
    private _companyService: CompanyService,
    private _profileService: ProfileService
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
    this._typeUserListComponent.matDrawer.open();
    /**
     * Create the typeUser form
     */
    this.typeUserForm = this._formBuilder.group({
      id_type_user: [''],
      id_company: [''],
      id_profile: [''],
      name_type_user: ['', [Validators.required, Validators.maxLength(100)]],
      description_type_user: [
        '',
        [Validators.required, Validators.maxLength(250)],
      ],
      status_type_user: ['', [Validators.required]],
    });
    /**
     * Get the typeUsers
     */
    this._typeUserService.typeUsers$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((typeUsers: TypeUser[]) => {
        this.typeUsers = typeUsers;
        /**
         * Mark for check
         */
        this._changeDetectorRef.markForCheck();
      });
    /**
     * Get the typeUser
     */
    this._typeUserService.typeUser$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((typeUser: TypeUser) => {
        /**
         * Open the drawer in case it is closed
         */
        this._typeUserListComponent.matDrawer.open();
        /**
         * Get the typeUser
         */
        this.typeUser = typeUser;

        // Profile
        this._profileService
          .byCompanyQueryRead(this.id_company, '*')
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((profiles: Profile[]) => {
            this.listProfile = profiles;

            this.selectedProfile = this.listProfile.find(
              (item) =>
                item.id_profile == this.typeUser.profile.id_profile.toString()
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
    this.typeUserForm.patchValue({
      ...this.typeUser,
      id_company: this.typeUser.company.id_company,
      id_profile: this.typeUser.profile.id_profile,
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
    return this._typeUserListComponent.matDrawer.close();
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

  /**
   * Update the typeUser
   */
  updateTypeUser(): void {
    /**
     * Get the typeUser
     */
    const id_user_ = this.data.user.id_user;
    let typeUser = this.typeUserForm.getRawValue();
    /**
     * Delete whitespace (trim() the atributes type string)
     */
    typeUser = {
      ...typeUser,
      id_user_: parseInt(id_user_),
      id_type_user: parseInt(typeUser.id_type_user),
      company: {
        id_company: parseInt(typeUser.id_company),
      },
      name_type_user: typeUser.name_type_user.trim(),
      description_type_user: typeUser.description_type_user.trim(),
      profile: {
        id_profile: parseInt(typeUser.id_profile),
      },
    };
    /**
     * Update
     */
    this._typeUserService
      .update(typeUser)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (_typeUser: TypeUser) => {
          if (_typeUser) {
            this._notificationService.success(
              'Tipo de usuario actualizado correctamente'
            );
            /**
             * Toggle the edit mode off
             */
            this.toggleEditMode(false);
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
  /**
   * Delete the typeUser
   */
  deleteTypeUser(): void {
    this._angelConfirmationService
      .open({
        title: 'Eliminar tipo de usuario',
        message:
          '¿Estás seguro de que deseas eliminar este tipo de usuario? ¡Esta acción no se puede deshacer!',
      })
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((confirm: ActionAngelConfirmation) => {
        if (confirm === 'confirmed') {
          /**
           * Get the current typeUser's id
           */
          const id_user_ = this.data.user.id_user;
          const id_type_user = this.typeUser.id_type_user;
          /**
           * Get the next/previous typeUser's id
           */
          const currentIndex = this.typeUsers.findIndex(
            (item) => item.id_type_user === id_type_user
          );

          const nextIndex =
            currentIndex +
            (currentIndex === this.typeUsers.length - 1 ? -1 : 1);
          const nextId =
            this.typeUsers.length === 1 &&
            this.typeUsers[0].id_type_user === id_type_user
              ? null
              : this.typeUsers[nextIndex].id_type_user;
          /**
           * Delete
           */
          this._typeUserService
            .delete(id_user_, id_type_user)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
              next: (response: boolean) => {
                if (response) {
                  /**
                   * Return if the typeUser wasn't deleted...
                   */
                  this._notificationService.success(
                    'Tipo de usuario eliminado correctamente'
                  );
                  /**
                   * Get the current activated route
                   */
                  let route = this._activatedRoute;
                  while (route.firstChild) {
                    route = route.firstChild;
                  }
                  /**
                   * Navigate to the next typeUser if available
                   */
                  if (nextId) {
                    this._router.navigate(['../', nextId], {
                      relativeTo: route,
                    });
                  } else {
                    /**
                     * Otherwise, navigate to the parent
                     */
                    this._router.navigate(['../'], { relativeTo: route });
                  }
                  /**
                   * Toggle the edit mode off
                   */
                  this.toggleEditMode(false);
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
          /**
           * Mark for check
           */
          this._changeDetectorRef.markForCheck();
        }
        this._layoutService.setOpenModal(false);
      });
  }
}
