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
import Ajv from 'ajv';
import { AppInitialData, MessageAPI } from 'app/core/app/app.type';
import { LayoutService } from 'app/layout/layout.service';
import { ModalViewSchemaService } from 'app/shared/modal-view-schema/modal-view-schema.service';
import { NotificationService } from 'app/shared/notification/notification.service';
import { filter, fromEvent, merge, Subject, takeUntil } from 'rxjs';
import { company } from '../../company/company.data';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../company/company.types';
import { NavigationListComponent } from '../list/list.component';
import { NavigationService } from '../navigation.service';
import {
  Navigation,
  TYPE_NAVIGATION,
  TYPE_NAVIGATION_ENUM,
  _typeNavigation,
} from '../navigation.types';
import schemaFile from '../schema.content.navigation.json';

@Component({
  selector: 'navigation-details',
  templateUrl: './details.component.html',
  animations: angelAnimations,
})
export class NavigationDetailsComponent implements OnInit {
  listCompany: Company[] = [];
  selectedCompany: Company = company;
  /**
   * ajv
   */
  ajv = new Ajv({ allErrors: true, strictTuples: false });
  schema = schemaFile;
  /**
   * ajv
   */
  nameEntity: string = 'Navegación';
  private data!: AppInitialData;

  /**
   * Type Enum TYPE_NAVIGATION
   */
  typeNavigation: TYPE_NAVIGATION_ENUM[] = _typeNavigation;

  typeNavigationSelect!: TYPE_NAVIGATION_ENUM;

  /**
   * Type Enum TYPE_NAVIGATION
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
  navigation!: Navigation;
  navigationForm!: FormGroup;
  private navigations!: Navigation[];

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
    private _navigationListComponent: NavigationListComponent,
    private _navigationService: NavigationService,
    @Inject(DOCUMENT) private _document: any,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _notificationService: NotificationService,
    private _angelConfirmationService: AngelConfirmationService,
    private _layoutService: LayoutService,
    private _companyService: CompanyService,
    private _modalViewSchemeService: ModalViewSchemaService
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
    this._navigationListComponent.matDrawer.open();
    /**
     * Create the navigation form
     */
    this.navigationForm = this._formBuilder.group({
      id_navigation: [''],
      id_company: [''],
      name_navigation: ['', [Validators.required, Validators.maxLength(100)]],
      description_navigation: [
        '',
        [Validators.required, Validators.maxLength(250)],
      ],
      type_navigation: ['', [Validators.required]],
      status_navigation: ['', [Validators.required]],
      content_navigation: ['', [Validators.required]],
    });
    /**
     * Get the navigations
     */
    this._navigationService.navigations$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((navigations: Navigation[]) => {
        this.navigations = navigations;
        /**
         * Mark for check
         */
        this._changeDetectorRef.markForCheck();
      });
    /**
     * Get the navigation
     */
    this._navigationService.navigation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((navigation: Navigation) => {
        /**
         * Open the drawer in case it is closed
         */
        this._navigationListComponent.matDrawer.open();
        /**
         * Get the navigation
         */
        this.navigation = navigation;

        /**
         * Type Enum TYPE_NAVIGATION
         */
        this.typeNavigationSelect = this.typeNavigation.find(
          (e_navigation) =>
            e_navigation.value_type == this.navigation.type_navigation
        )!;
        /**
         * Type Enum TYPE_NAVIGATION
         */

        // Company
        this._companyService
          .queryRead('*')
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((companys: Company[]) => {
            this.listCompany = companys;

            this.selectedCompany = this.listCompany.find(
              (item) =>
                item.id_company == this.navigation.company.id_company.toString()
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
    this.navigationForm.patchValue({
      ...this.navigation,
      id_company: this.navigation.company.id_company,
      content_navigation: JSON.stringify(
        this.navigation.content_navigation,
        null,
        2
      ),
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
    return this._navigationListComponent.matDrawer.close();
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
   * Update the navigation
   */
  updateNavigation(): void {
    /**
     * Get the navigation
     */
    const id_user_ = this.data.user.id_user;
    let navigation = this.navigationForm.getRawValue();
    /**
     * Delete whitespace
     */
    navigation = {
      ...navigation,
      id_user_: parseInt(id_user_),
      id_navigation: parseInt(navigation.id_navigation),
      company: {
        id_company: parseInt(navigation.id_company),
      },
      name_navigation: navigation.name_navigation.trim(),
      description_navigation: navigation.description_navigation.trim(),
      content_navigation: navigation.content_navigation.trim(),
    };

    if (this.IsJsonString(navigation.content_navigation)) {
      /**
       * Update
       */

      if (
        this.validateJsonScheme(
          this.schema,
          JSON.parse(navigation.content_navigation)
        )
      ) {
        this._navigationService
          .update({
            ...navigation,
            content_navigation: JSON.parse(navigation.content_navigation),
          })
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe({
            next: (_navigation: Navigation) => {
              if (_navigation) {
                this._notificationService.success(
                  'Navegación actualizada correctamente'
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
      } else {
        this._notificationService.error(
          '¡El JSON no paso la validación del esquema!'
        );
      }
    } else {
      this._notificationService.error('¡El JSON del contenido es invalido!');
    }
  }
  /**
   * Delete the navigation
   */
  deleteNavigation(): void {
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
          /**
           * Get the current navigation's id
           */
          const id_user_ = this.data.user.id_user;
          const id_navigation = this.navigation.id_navigation;
          /**
           * Get the next/previous navigation's id
           */
          const currentIndex = this.navigations.findIndex(
            (item) => item.id_navigation === id_navigation
          );

          const nextIndex =
            currentIndex +
            (currentIndex === this.navigations.length - 1 ? -1 : 1);
          const nextId =
            this.navigations.length === 1 &&
            this.navigations[0].id_navigation === id_navigation
              ? null
              : this.navigations[nextIndex].id_navigation;
          /**
           * Delete
           */
          this._navigationService
            .delete(id_user_, id_navigation)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
              next: (response: boolean) => {
                if (response) {
                  /**
                   * Return if the navigation wasn't deleted...
                   */
                  this._notificationService.success(
                    'Navegación eliminada correctamente'
                  );
                  /**
                   * Get the current activated route
                   */
                  let route = this._activatedRoute;
                  while (route.firstChild) {
                    route = route.firstChild;
                  }
                  /**
                   * Navigate to the next navigation if available
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
   * getTypeNavigationEnum
   */
  getTypeNavigationEnum(
    type_navigation: TYPE_NAVIGATION
  ): TYPE_NAVIGATION_ENUM {
    return this.typeNavigation.find(
      (e_navigation) => e_navigation.value_type == type_navigation
    )!;
  }
  /**
   * parseJsonToText
   * @returns
   */
  parseJsonToText(json: any) {
    return JSON.stringify(json, null, 2);
  }
  /**
   * IsJsonString
   * @returns
   */
  IsJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  /**
   * validateJsonScheme
   * @returns
   */
  validateJsonScheme(schema: any, data: any): boolean {
    const validate = this.ajv.compile(schema);
    const isValid = validate(data);
    return isValid;
  }
  /**
   * viewSchema
   */
  viewSchema() {
    this._modalViewSchemeService
      .openModalViewSchemaService(this.schema)
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._layoutService.setOpenModal(false);
      });
  }
}
