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
import { company } from '../../company/company.data';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../company/company.types';
import { ValidationListComponent } from '../list/list.component';
import { ValidationService } from '../validation.service';
import {
  TYPE_VALIDATION,
  TYPE_VALIDATION_ENUM,
  Validation,
  _typeValidation,
} from '../validation.types';

@Component({
  selector: 'validation-details',
  templateUrl: './details.component.html',
  animations: angelAnimations,
})
export class ValidationDetailsComponent implements OnInit {
  listCompany: Company[] = [];
  selectedCompany: Company = company;

  nameEntity: string = 'Validación';
  private data!: AppInitialData;

  /**
   * Type Enum TYPE_VALIDATION
   */
  typeValidation: TYPE_VALIDATION_ENUM[] = _typeValidation;

  typeValidationSelect!: TYPE_VALIDATION_ENUM;

  /**
   * Type Enum TYPE_VALIDATION
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
  validation!: Validation;
  validationForm!: FormGroup;
  private validations!: Validation[];

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
    private _validationListComponent: ValidationListComponent,
    private _validationService: ValidationService,
    @Inject(DOCUMENT) private _document: any,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _notificationService: NotificationService,
    private _angelConfirmationService: AngelConfirmationService,
    private _layoutService: LayoutService,
    private _companyService: CompanyService
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
    this._validationListComponent.matDrawer.open();
    /**
     * Create the validation form
     */
    this.validationForm = this._formBuilder.group({
      id_validation: [''],
      id_company: [''],
      type_validation: ['', [Validators.required]],
      status_validation: ['', [Validators.required]],
      pattern_validation: [
        '',
        [Validators.required, Validators.maxLength(500)],
      ],
      message_validation: [
        '',
        [Validators.required, Validators.maxLength(250)],
      ],
    });
    /**
     * Get the validations
     */
    this._validationService.validations$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((validations: Validation[]) => {
        this.validations = validations;
        /**
         * Mark for check
         */
        this._changeDetectorRef.markForCheck();
      });
    /**
     * Get the validation
     */
    this._validationService.validation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((validation: Validation) => {
        /**
         * Open the drawer in case it is closed
         */
        this._validationListComponent.matDrawer.open();
        /**
         * Get the validation
         */
        this.validation = validation;

        /**
         * Type Enum TYPE_VALIDATION
         */
        this.typeValidationSelect = this.typeValidation.find(
          (e_validation) =>
            e_validation.value_type == this.validation.type_validation
        )!;
        /**
         * Type Enum TYPE_VALIDATION
         */

        // Company
        this._companyService
          .queryRead('*')
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((companys: Company[]) => {
            this.listCompany = companys;

            this.selectedCompany = this.listCompany.find(
              (item) =>
                item.id_company == this.validation.company.id_company.toString()
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
    this.validationForm.patchValue({
      ...this.validation,
      id_company: this.validation.company.id_company,
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
    return this._validationListComponent.matDrawer.close();
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
   * Update the validation
   */
  updateValidation(): void {
    /**
     * Get the validation
     */
    const id_user_ = this.data.user.id_user;
    let validation = this.validationForm.getRawValue();
    /**
     * Delete whitespace (trim() the atributes type string)
     */
    validation = {
      ...validation,
      pattern_validation: validation.pattern_validation.trim(),
      message_validation: validation.message_validation.trim(),
      id_user_: parseInt(id_user_),
      id_validation: parseInt(validation.id_validation),
      company: {
        id_company: parseInt(validation.id_company),
      },
    };
    /**
     * Update
     */
    this._validationService
      .update(validation)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (_validation: Validation) => {
          if (_validation) {
            this._notificationService.success(
              'Validación actualizada correctamente'
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
   * Delete the validation
   */
  deleteValidation(): void {
    this._angelConfirmationService
      .open({
        title: 'Eliminar validación',
        message:
          '¿Estás seguro de que deseas eliminar esta validación? ¡Esta acción no se puede deshacer!',
      })
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((confirm: ActionAngelConfirmation) => {
        if (confirm === 'confirmed') {
          /**
           * Get the current validation's id
           */
          const id_user_ = this.data.user.id_user;
          const id_validation = this.validation.id_validation;
          /**
           * Get the next/previous validation's id
           */
          const currentIndex = this.validations.findIndex(
            (item) => item.id_validation === id_validation
          );

          const nextIndex =
            currentIndex +
            (currentIndex === this.validations.length - 1 ? -1 : 1);
          const nextId =
            this.validations.length === 1 &&
            this.validations[0].id_validation === id_validation
              ? null
              : this.validations[nextIndex].id_validation;
          /**
           * Delete
           */
          this._validationService
            .delete(id_user_, id_validation)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
              next: (response: boolean) => {
                if (response) {
                  /**
                   * Return if the validation wasn't deleted...
                   */
                  this._notificationService.success(
                    'Validación eliminada correctamente'
                  );
                  /**
                   * Get the current activated route
                   */
                  let route = this._activatedRoute;
                  while (route.firstChild) {
                    route = route.firstChild;
                  }
                  /**
                   * Navigate to the next validation if available
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
   * getTypeValidationEnum
   */
  getTypeValidationEnum(
    type_validation: TYPE_VALIDATION
  ): TYPE_VALIDATION_ENUM {
    return this.typeValidation.find(
      (e_validation) => e_validation.value_type == type_validation
    )!;
  }
}
