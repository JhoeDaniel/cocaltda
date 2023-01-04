import { angelAnimations } from '@angel/animations';
import { AngelAlertType } from '@angel/components/alert';
import {
  ActionAngelConfirmation,
  AngelConfirmationService,
} from '@angel/services/confirmation';
import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppInitialData, MessageAPI } from 'app/core/app/app.type';
import { AuthService } from 'app/core/auth/auth.service';
import { LayoutService } from 'app/layout/layout.service';
import { company } from 'app/modules/core/company/company.data';
import { CompanyService } from 'app/modules/core/company/company.service';
import { Company } from 'app/modules/core/company/company.types';
import { SessionService } from 'app/modules/core/session/session.service';
import { ModalValidationsService } from 'app/modules/core/validation/modal-validations/modal-validations.service';
import { NotificationService } from 'app/shared/notification/notification.service';
import { Subject, takeUntil } from 'rxjs';
import { SettingsCompanyService } from './settings-company.service';

@Component({
  selector: 'app-settings-company',
  templateUrl: './settings-company.component.html',
  animations: angelAnimations,
})
export class SettingsCompanyComponent implements OnInit {
  private data!: AppInitialData;

  editMode: boolean = false;
  id_company: string = '';
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
  company: Company = company;
  companyForm!: FormGroup;

  private _tagsPanelOverlayRef!: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _store: Store<{ global: AppInitialData }>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _changeDetectorRef: ChangeDetectorRef,
    private _companyService: CompanyService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private _settingsCompanyService: SettingsCompanyService,
    private _angelConfirmationService: AngelConfirmationService,
    private _sessionService: SessionService,
    private _layoutService: LayoutService,
    private _modalValidationsService: ModalValidationsService
  ) {}

  /** ----------------------------------------------------------------------------------------------------- */
  /** @ Lifecycle hooks
	  /** ----------------------------------------------------------------------------------------------------- */

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
     * Get the id_company
     */
    this.id_company = this._data.id_company;
    /**
     * Subscribe to user changes of state
     */
    this._store.pipe(takeUntil(this._unsubscribeAll)).subscribe((state) => {
      this.data = state.global;
    });
    /**
     * Create the company form
     */
    this.companyForm = this._formBuilder.group({
      id_company: [''],
      id_setting: [''],
      name_company: ['', [Validators.required, Validators.maxLength(100)]],
      acronym_company: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      address_company: ['', [Validators.required, Validators.maxLength(250)]],
      status_company: ['', [Validators.required]],
      expiration_token: ['', [Validators.required, Validators.min(60)]],
      expiration_verification_code: [
        '',
        [Validators.required, Validators.min(60)],
      ],
      inactivity_time: ['', [Validators.required, Validators.min(60)]],
      session_limit: ['', [Validators.required, Validators.min(1)]],
      save_log: ['', [Validators.required]],
      save_file_alfresco: ['', [Validators.required]],
      modification_status: ['', [Validators.required]],
    });
    /**
     * Patch values to the form
     */
    this.patchForm();
    /**
     * Get the company
     */
    this._companyService
      .specificRead(this.id_company)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_company: Company) => {
        this.company = _company;
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
  }
  /**
   * Pacth the form with the information of the database
   */
  patchForm(): void {
    this.companyForm.patchValue({
      ...this.company,
      id_setting: this.company.setting.id_setting,
      expiration_token: this.company.setting.expiration_token,
      expiration_verification_code:
        this.company.setting.expiration_verification_code,
      inactivity_time: this.company.setting.inactivity_time,
      session_limit: this.company.setting.session_limit,
      save_log: this.company.setting.save_log,
      save_file_alfresco: this.company.setting.save_file_alfresco,
      modification_status: this.company.setting.modification_status,
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
   * Toggle edit mode
   * @param editMode
   */
  toggleEditMode(editMode: boolean | null = null): void {
    this.patchForm();

    if (editMode === null) {
      this.editMode = !this.editMode;
      // Disable the form
      this.companyForm.enable();
    } else {
      this.companyForm.disable();
      this.editMode = editMode;
    }
    /**
     * Mark for check
     */
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Update the company
   */
  updateCompany(): void {
    /**
     * Get the company
     */
    const id_user_ = this.data.user.id_user;
    let company = this.companyForm.getRawValue();
    /**
     * Delete whitespace (trim() the atributes type string)
     */
    company = {
      ...company,
      name_company: company.name_company.trim(),
      acronym_company: company.acronym_company.trim(),
      address_company: company.address_company.trim(),
      setting: {
        id_setting: parseInt(company.id_setting.toString()),
        expiration_token: parseInt(company.expiration_token),
        expiration_verification_code: parseInt(
          company.expiration_verification_code
        ),
        inactivity_time: parseInt(company.inactivity_time),
        session_limit: parseInt(company.session_limit),
        save_log: company.save_log,
        save_file_alfresco: company.save_file_alfresco,
        modification_status: company.modification_status,
      },
      id_user_: parseInt(id_user_),
      id_company: parseInt(company.id_company),
    };

    delete company.id_setting;
    delete company.expiration_token;
    delete company.expiration_verification_code;
    delete company.inactivity_time;
    delete company.session_limit;
    delete company.save_log;
    delete company.save_file_alfresco;
    delete company.modification_status;
    /**
     * Update
     */
    this._companyService
      .update(company)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (_company: Company) => {
          if (_company) {
            this.company = _company;
            this._notificationService.success(
              'Configuración actualizada correctamente'
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
   * Save and close
   */
  close(): void {
    this._settingsCompanyService.closeSettingsCompanyService();
  }
  /**
   * byCompanyReleaseAll
   */
  byCompanyReleaseAll() {
    this._angelConfirmationService
      .open({
        title: 'Cerrar sesión',
        message:
          '¿Estás seguro de que deseas cerrar todas las sesiones de esta empresa? ¡Esta acción no se puede deshacer!',
      })
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((confirm: ActionAngelConfirmation) => {
        if (confirm === 'confirmed') {
          const id_user_ = this.data.user.id_user;
          const id_company = this.data.user.company.id_company;

          let sesion = {
            id_user_: parseInt(id_user_),
            user: {
              company: {
                id_company: parseInt(id_company),
              },
            },
          };
          /**
           * Create the sesiones
           */
          this._sessionService
            .byCompanyReleaseAll(sesion)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
              next: (response: boolean) => {
                if (response) {
                  this._notificationService.success(
                    'Sesiones finalizadas correctamente'
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
   * openModalValidations
   */
  openModalValidations(): void {
    const id_company = this.data.user.company.id_company;
    this._modalValidationsService.openModalValidations(id_company);
  }
}
