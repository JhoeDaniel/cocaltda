import { angelAnimations } from '@angel/animations';
import { AngelAlertType } from '@angel/components/alert';
import {
  ActionAngelConfirmation,
  AngelConfirmationService,
} from '@angel/services/confirmation';
import { OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppInitialData, MessageAPI } from 'app/core/app/app.type';
import { LayoutService } from 'app/layout/layout.service';
import { NotificationService } from 'app/shared/notification/notification.service';
import { cloneDeep } from 'lodash';
import { filter, fromEvent, merge, Subject, takeUntil } from 'rxjs';
import { NavigationService } from '../../navigation/navigation.service';
import { Navigation } from '../../navigation/navigation.types';
import { ProfileListComponent } from '../list/list.component';
import { ProfileNavigationService } from '../profile-navigation/profile-navigation.service';
import { ProfileNavigation } from '../profile-navigation/profile-navigation.types';
import { ProfileService } from '../profile.service';
import {
  Profile,
  TYPE_PROFILE,
  TYPE_PROFILE_ENUM,
  _typeProfile,
} from '../profile.types';

@Component({
  selector: 'profile-details',
  templateUrl: './details.component.html',
  animations: angelAnimations,
})
export class ProfileDetailsComponent implements OnInit {
  nameEntity: string = 'Perfil';
  private data!: AppInitialData;

  /**
   * Type Enum TYPE_PROFILE
   */
  typeProfile: TYPE_PROFILE_ENUM[] = _typeProfile;

  typeProfileSelect!: TYPE_PROFILE_ENUM;

  /**
   * Type Enum TYPE_PROFILE
   */

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
  profile!: Profile;
  profileForm!: FormGroup;
  private profiles!: Profile[];

  /**
   * Navigations
   */
  categoriesNavigations: Navigation[] = [];
  isSelectedAll: boolean = false;

  profileNavigations: ProfileNavigation[] = [];
  /**
   * Navigations
   */

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
    private _profileListComponent: ProfileListComponent,
    private _profileService: ProfileService,
    @Inject(DOCUMENT) private _document: any,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _notificationService: NotificationService,
    private _angelConfirmationService: AngelConfirmationService,
    private _layoutService: LayoutService,
    private _profileNavigationService: ProfileNavigationService,
    private _navigationService: NavigationService
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
    });
    /**
     * Open the drawer
     */
    this._profileListComponent.matDrawer.open();
    /**
     * Create the profile form
     */
    this.profileForm = this._formBuilder.group({
      id_profile: [''],
      id_company: [''],
      type_profile: ['', [Validators.required]],
      name_profile: ['', [Validators.required, Validators.maxLength(100)]],
      description_profile: [
        '',
        [Validators.required, Validators.maxLength(250)],
      ],
      status_profile: ['', [Validators.required]],
      navigations: this._formBuilder.array([]),
    });
    /**
     * Get the profiles
     */
    this._profileService.profiles$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((profiles: Profile[]) => {
        this.profiles = profiles;
        /**
         * Mark for check
         */
        this._changeDetectorRef.markForCheck();
      });
    /**
     * Get the profile
     */
    this._profileService.profile$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((profile: Profile) => {
        /**
         * Open the drawer in case it is closed
         */
        this._profileListComponent.matDrawer.open();
        /**
         * Get the profile
         */
        this.profile = profile;

        /**
         * Type Enum TYPE_PROFILE
         */
        this.typeProfileSelect = this.typeProfile.find(
          (e_profile) => e_profile.value_type == this.profile.type_profile
        )!;
        /**
         * Type Enum TYPE_PROFILE
         */

        /**
         * Subscribe to profile navigation
         */
        this._profileNavigationService
          .byProfileRead(this.profile.id_profile)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe();

        this._navigationService
          .queryRead('*')
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((navigations: Navigation[]) => {
            this.categoriesNavigations = navigations;
            /**
             * Subscribe to perfil usuario navigation
             */
            this._profileNavigationService.profileNavigations$
              .pipe(takeUntil(this._unsubscribeAll))
              .subscribe((_profileNavigation: ProfileNavigation[]) => {
                this.profileNavigations = _profileNavigation;
                if (
                  this.profileNavigations.length ==
                  this.categoriesNavigations.length
                ) {
                  this.isSelectedAll = true;
                } else {
                  this.isSelectedAll = false;
                }

                /**
                 * Filter select
                 */
                /**
                 * Reset the selection
                 * 1) add attribute isSelected
                 * 2) [disabled]="entity.isSelected" in mat-option
                 */
                this.categoriesNavigations.map((item, index) => {
                  item = {
                    ...item,
                    isSelected: false,
                  };
                  this.categoriesNavigations[index] = item;
                });

                let filterCategoriesNavigations: Navigation[] = cloneDeep(
                  this.categoriesNavigations
                );
                /**
                 * Selected Items
                 */
                this.profileNavigations.map((itemOne) => {
                  /**
                   * All Items
                   */
                  filterCategoriesNavigations.map((itemTwo, indexTwo) => {
                    if (
                      itemTwo.id_navigation == itemOne.navigation!.id_navigation
                    ) {
                      itemTwo = {
                        ...itemTwo,
                        isSelected: true,
                      };

                      filterCategoriesNavigations[indexTwo] = itemTwo;
                    }
                  });
                });

                this.categoriesNavigations = filterCategoriesNavigations;
                /**
                 * Filter select
                 */

                /**
                 * Clear the navigations form arrays
                 */
                (this.profileForm.get('navigations') as FormArray).clear();

                const navigationsFormGroups: any = [];

                /**
                 * Iterate through them
                 */
                this.profileNavigations.forEach(
                  (_profileNavigation, index: number) => {
                    /**
                     * Create an navigation form group
                     */
                    navigationsFormGroups.push(
                      this._formBuilder.group({
                        id_profile_navigation: [
                          _profileNavigation.id_profile_navigation,
                        ],
                        name_navigation: [
                          {
                            value:
                              _profileNavigation.navigation!.name_navigation,
                            disabled:
                              this.profileNavigations.length != index + 1 ||
                              this.isSelectedAll,
                          },
                        ],
                        navigation: [_profileNavigation.navigation],
                        profile: [_profileNavigation.profile],
                      })
                    );
                  }
                );

                /**
                 * Add the navigations form groups to the navigations form array
                 */
                navigationsFormGroups.forEach((navigationsFormGroup: any) => {
                  (this.profileForm.get('navigations') as FormArray).push(
                    navigationsFormGroup
                  );
                });
              });
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

  get formArrayNavigations(): FormArray {
    return this.profileForm.get('navigations') as FormArray;
  }

  getFromControl(
    formArray: FormArray,
    index: number,
    control: string
  ): FormControl {
    return formArray.controls[index].get(control) as FormControl;
  }

  /**
   * Pacth the form with the information of the database
   */
  patchForm(): void {
    this.profileForm.patchValue({
      ...this.profile,
      id_company: this.profile.company.id_company,
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
    return this._profileListComponent.matDrawer.close();
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
   * Update the profile
   */
  updateProfile(): void {
    /**
     * Validate the default navigation
     */
    if (!this.validatetionHorizontalNavigation(this.profileNavigations)) {
      this._notificationService.warn(
        'Tenga en cuenta que si desea usar la navegación horizontal tiene que seleccionar la navegación por defecto para clonar las rutas'
      );
      return;
    }
    /**
     * Get the profile
     */
    const id_user_ = this.data.user.id_user;
    let profile = this.profileForm.getRawValue();
    /**
     * Delete whitespace (trim() the atributes type string)
     */
    profile = {
      ...profile,
      id_user_: parseInt(id_user_),
      id_profile: parseInt(profile.id_profile),
      name_profile: profile.name_profile.trim(),
      description_profile: profile.description_profile.trim(),
      company: {
        id_company: parseInt(profile.id_company),
      },
    };
    /**
     * Update
     */
    this._profileService
      .update(profile)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (_profile: Profile) => {
          if (_profile) {
            this._notificationService.success(
              'Perfil actualizado correctamente'
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
   * Delete the profile
   */
  deleteProfile(): void {
    this._angelConfirmationService
      .open({
        title: 'Eliminar perfil',
        message:
          '¿Estás seguro de que deseas eliminar este perfil? ¡Esta acción no se puede deshacer!',
      })
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((confirm: ActionAngelConfirmation) => {
        if (confirm === 'confirmed') {
          /**
           * Get the current profile's id
           */
          const id_user_ = this.data.user.id_user;
          const id_profile = this.profile.id_profile;
          /**
           * Get the next/previous profile's id
           */
          const currentIndex = this.profiles.findIndex(
            (item) => item.id_profile === id_profile
          );

          const nextIndex =
            currentIndex + (currentIndex === this.profiles.length - 1 ? -1 : 1);
          const nextId =
            this.profiles.length === 1 &&
            this.profiles[0].id_profile === id_profile
              ? null
              : this.profiles[nextIndex].id_profile;
          /**
           * Delete
           */
          this._profileService
            .delete(id_user_, id_profile)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
              next: (response: boolean) => {
                if (response) {
                  /**
                   * Return if the profile wasn't deleted...
                   */
                  this._notificationService.success(
                    'Perfil eliminado correctamente'
                  );
                  /**
                   * Get the current activated route
                   */
                  let route = this._activatedRoute;
                  while (route.firstChild) {
                    route = route.firstChild;
                  }
                  /**
                   * Navigate to the next profile if available
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
  /**
   * Add navigation field
   */
  addNavigationField(): void {
    const id_user_ = this.data.user.id_user;
    const id_profile = this.profile.id_profile;

    this._profileNavigationService
      .create(id_user_, id_profile)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (_profileNavigation: ProfileNavigation) => {
          if (_profileNavigation) {
            this._notificationService.success(
              'Navegación agregada correctamente'
            );
          } else {
            this._notificationService.error(
              'Ocurrió un error agregando la navegación'
            );
          }
          /**
           * Mark for check
           */
          this._changeDetectorRef.markForCheck();
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

  updateNavigationField(index: number) {
    const navigationsFormArray = this.profileForm.get(
      'navigations'
    ) as FormArray;
    const id_user_ = this.data.user.id_user;
    let profileNavigation = navigationsFormArray.getRawValue()[index];

    let navigationUpdate = this.categoriesNavigations.find(
      (item) => item.name_navigation == profileNavigation.name_navigation
    );

    profileNavigation = {
      ...profileNavigation,
      id_user_: parseInt(id_user_),
      id_profile_navigation: parseInt(profileNavigation.id_profile_navigation),
      profile: {
        id_profile: parseInt(profileNavigation.profile.id_profile),
      },
      navigation: {
        ...navigationUpdate,
        id_navigation: parseInt(navigationUpdate!.id_navigation),
      },
    };

    delete profileNavigation.name_navigation;

    /**
     * Update the profileNavigation
     */
    this._profileNavigationService
      .update(profileNavigation)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (_profileNavigation: ProfileNavigation) => {
          if (_profileNavigation) {
            this._notificationService.success(
              'Navegación actualizada correctamente'
            );
          } else {
            this._notificationService.error(
              'Ocurrió un error actualizando la navegación'
            );
          }
          /**
           * Mark for check
           */
          this._changeDetectorRef.markForCheck();
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
  /**
   * Remove the navigation field
   * @param index
   */
  removeNavigationField(index: number): void {
    this._angelConfirmationService
      .open({
        title: 'Eliminar navegación',
        message:
          '¿Estás seguro de que deseas eliminar esta navegación? ¡Esta acción no se puede deshacer!',
      })
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((confirm: ActionAngelConfirmation) => {
        if (confirm === 'confirmed') {
          const navigationsFormArray = this.profileForm.get(
            'navigations'
          ) as FormArray;

          /**
           * Get the current perfilUsuario's id
           */
          const id_user_ = this.data.user.id_user;
          const profileNavigation = navigationsFormArray.getRawValue()[index];
          /**
           * Delete the perfilUsuario
           */
          this._profileNavigationService
            .delete(id_user_, profileNavigation.id_profile_navigation)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
              next: (response: boolean) => {
                if (response) {
                  this.enabledLastNavigation();
                  this._notificationService.success(
                    'Navegación eliminada correctamente'
                  );
                } else {
                  this._notificationService.error(
                    'Ocurrió un error eliminando la navegación'
                  );
                }
                /**
                 * Mark for check
                 */
                this._changeDetectorRef.markForCheck();
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
  /**
   * getTypeProfileEnum
   */
  getTypeProfileEnum(type_profile: TYPE_PROFILE): TYPE_PROFILE_ENUM {
    return this.typeProfile.find(
      (e_profile) => e_profile.value_type == type_profile
    )!;
  }
  /**
   * Habilitar el control de la ultima navegación
   * @param index
   */
  enabledLastNavigation(): void {
    this.formArrayNavigations.controls.map((control: any, index: number) => {
      if (this.formArrayNavigations.controls.length == index + 1) {
        setTimeout(() => {
          this.getFromControl(
            this.formArrayNavigations,
            index,
            'name_navigation'
          ).enable();
        }, 1);
      }
    });
  }
  /**
   * Validación para la navegación horizontal
   * @returns boolean
   */
  validatetionHorizontalNavigation(
    _profileNavigation: ProfileNavigation[]
  ): boolean {
    let havedHorizontalNavigation: boolean = false;
    let havedDefaultNavigation: boolean = false;

    _profileNavigation.map((item) => {
      if (item.navigation.type_navigation == 'horizontalNavigation') {
        havedHorizontalNavigation = true;
      }
      if (item.navigation.type_navigation == 'defaultNavigation') {
        havedDefaultNavigation = true;
      }
    });

    if (havedHorizontalNavigation && !havedDefaultNavigation) {
      return false;
    } else {
      return true;
    }
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
