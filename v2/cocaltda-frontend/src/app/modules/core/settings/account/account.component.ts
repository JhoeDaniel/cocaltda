import { AngelAlertType } from '@angel/components/alert';
import { OverlayRef } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppInitialData, MessageAPI } from 'app/core/app/app.type';
import { Subject, takeUntil } from 'rxjs';
import { company } from '../../company/company.data';
import { Company } from '../../company/company.types';
import { TYPE_PROFILE } from '../../profile/profile.types';
import { typeUser } from '../../type-user/type-user.data';
import { TypeUser } from '../../type-user/type-user.types';
import { User } from '../../user/user.types';
import { validation } from '../../validation/validation.data';
import { Validation } from '../../validation/validation.types';

import { angelAnimations } from '@angel/animations';
import { ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { LayoutService } from 'app/layout/layout.service';
import { NotificationService } from 'app/shared/notification/notification.service';
import { CompanyService } from '../../company/company.service';
import { TypeUserService } from '../../type-user/type-user.service';
import { user } from '../../user/user.data';
import { UserService } from '../../user/user.service';
import { ValidationService } from '../../validation/validation.service';

@Component({
  selector: 'settings-account',
  templateUrl: './account.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: angelAnimations,
})
export class SettingsAccountComponent implements OnInit {
  accountForm!: FormGroup;

  type_profile: TYPE_PROFILE = 'commonProfile';
  id_user: string = '';
  id_company: string = '';

  listCompany: Company[] = [];
  selectedCompany: Company = company;

  listTypeUser: TypeUser[] = [];
  selectedTypeUser: TypeUser = typeUser;

  private data!: AppInitialData;
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
  user: User = user;
  userForm!: FormGroup;
  private users!: User[];

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
   * Validation
   */
  validationPassword: Validation = validation;
  validationDNI: Validation = validation;
  validationPhoneNumber: Validation = validation;
  /**
   * Validation
   */
  /**
   * Constructor
   */
  constructor(
    private _store: Store<{ global: AppInitialData }>,
    private _changeDetectorRef: ChangeDetectorRef,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    private _layoutService: LayoutService,
    private _companyService: CompanyService,
    private _typeUserService: TypeUserService,
    private _validationService: ValidationService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

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
     * Create the user form
     */
    this.userForm = this._formBuilder.group({
      id_user: [''],
      name_user: ['', [Validators.required, Validators.maxLength(320)]],
      password_user: ['', [Validators.required, Validators.maxLength(250)]],
      avatar_user: ['', [Validators.required, Validators.maxLength(50)]],
      status_user: ['', [Validators.required]],

      id_company: [''],

      id_person: [''],
      dni_person: ['', [Validators.required, Validators.maxLength(20)]],
      name_person: ['', [Validators.required, Validators.maxLength(150)]],
      last_name_person: ['', [Validators.required, Validators.maxLength(150)]],
      address_person: ['', [Validators.required, Validators.maxLength(150)]],
      phone_person: ['', [Validators.required, Validators.maxLength(13)]],

      id_academic: [''],
      title_academic: ['', [Validators.maxLength(250)]],
      abbreviation_academic: ['', [Validators.maxLength(50)]],
      level_academic: ['', [Validators.maxLength(100)]],

      id_job: [''],
      name_job: ['', [Validators.maxLength(200)]],
      address_job: ['', [Validators.maxLength(200)]],
      phone_job: ['', [Validators.maxLength(13)]],
      position_job: ['', [Validators.maxLength(150)]],

      id_type_user: [{ value: '', disabled: false }, [Validators.required]],
    });
    /**
     * Subscribe to user changes of state
     */
    this._store.pipe(takeUntil(this._unsubscribeAll)).subscribe((state) => {
      this.data = state.global;
      this.id_user = this.data.user.id_user;
      this.id_company = this.data.user.company.id_company;
      this.type_profile = this.data.user.type_user.profile.type_profile;
      if (this.type_profile != 'administator') {
        this.userForm.get('id_type_user')?.disable();
        this.userForm.get('status_user')?.disable();
        this.userForm.get('id_company')?.disable();
      }
    });
    /**
     * Patch values to the form
     */
    this.patchForm();
    /**
     * Validations
     */
    this._validationService.validationsActive$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((validations: Validation[]) => {
        /**
         * validationDNI
         */
        if (
          !validations.find(
            (validation) => validation.type_validation == 'validationDNI'
          )
        ) {
          this._validationService
            .byTypeValidationQueryRead(this.id_company, 'validationDNI')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
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
          this.validationDNI = validations.find(
            (validation) =>
              validation.type_validation == 'validationDNI' &&
              validation.status_validation
          )!;
          /**
           * Set Validation Pattern
           */
          if (this.validationDNI) {
            /**
             * Parse to String RegExp to RegExp
             */
            let validationDNIRegExp = new RegExp(
              this.validationDNI.pattern_validation
            );
            /**
             * Set Validators
             */
            this.userForm.controls['dni_person'].setValidators([
              Validators.required,
              Validators.maxLength(20),
              Validators.pattern(validationDNIRegExp),
            ]);
          } else {
            this.userForm.controls['dni_person'].setValidators([
              Validators.required,
              Validators.maxLength(20),
            ]);
          }
        }
        /**
         * validationPhoneNumber
         */
        if (
          !validations.find(
            (validation) =>
              validation.type_validation == 'validationPhoneNumber'
          )
        ) {
          this._validationService
            .byTypeValidationQueryRead(this.id_company, 'validationPhoneNumber')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
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
          this.validationPhoneNumber = validations.find(
            (validation) =>
              validation.type_validation == 'validationPhoneNumber' &&
              validation.status_validation
          )!;
          /**
           * Set Validation Pattern
           */
          if (this.validationPhoneNumber) {
            /**
             * Parse to String RegExp to RegExp
             */
            let validationPhoneNumberRegExp = new RegExp(
              this.validationPhoneNumber.pattern_validation
            );
            /**
             * Set Validators
             */
            this.userForm.controls['phone_person'].setValidators([
              Validators.required,
              Validators.maxLength(13),
              Validators.pattern(validationPhoneNumberRegExp),
            ]);
            this.userForm.controls['phone_job'].setValidators([
              Validators.maxLength(13),
              Validators.pattern(validationPhoneNumberRegExp),
            ]);
          } else {
            this.userForm.controls['phone_person'].setValidators([
              Validators.required,
              Validators.maxLength(13),
            ]);
            this.userForm.controls['phone_job'].setValidators([
              Validators.maxLength(13),
            ]);
          }
        }
      });
    /**
     * Validations
     */
    /**
     * Get the user
     */
    this._userService
      .specificRead(this.id_user)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._userService.user$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((user: User) => {
            /**
             * Get the user
             */
            this.user = user;

            // Company
            this._companyService
              .queryRead('*')
              .pipe(takeUntil(this._unsubscribeAll))
              .subscribe((companys: Company[]) => {
                this.listCompany = companys;

                this.selectedCompany = this.listCompany.find(
                  (item) =>
                    item.id_company == this.user.company.id_company.toString()
                )!;
              });

            // TypeUser
            this._typeUserService
              .byCompanyQueryRead(this.id_company, '*')
              .pipe(takeUntil(this._unsubscribeAll))
              .subscribe((type_users: TypeUser[]) => {
                this.listTypeUser = type_users;

                this.selectedTypeUser = this.listTypeUser.find(
                  (item) =>
                    item.id_type_user ==
                    this.user.type_user.id_type_user.toString()
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
      });
  }

  /**
   * Pacth the form with the information of the database
   */
  patchForm(): void {
    this.userForm.patchValue({
      ...this.user,
      id_company: this.user.company.id_company,

      id_person: this.user.person.id_person,
      dni_person: this.user.person.dni_person,
      name_person: this.user.person.name_person,
      last_name_person: this.user.person.last_name_person,
      address_person: this.user.person.address_person,
      phone_person: this.user.person.phone_person,

      id_academic: this.user.person.academic.id_academic,
      title_academic: this.user.person.academic.title_academic,
      abbreviation_academic: this.user.person.academic.abbreviation_academic,
      level_academic: this.user.person.academic.level_academic,

      id_job: this.user.person.job.id_job,
      name_job: this.user.person.job.name_job,
      address_job: this.user.person.job.address_job,
      phone_job: this.user.person.job.phone_job,
      position_job: this.user.person.job.position_job,

      id_type_user: this.user.type_user.id_type_user,
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

  /**
   * Update the user
   */
  updateUser(): void {
    /**
     * Get the user
     */
    const id_user_ = this.data.user.id_user;
    let user = this.userForm.getRawValue();
    /**
     * Delete whitespace (trim() the atributes type string)
     */
    user = {
      ...user,
      name_user: user.name_user.trim(),
      id_user_: parseInt(id_user_),
      id_user: parseInt(user.id_user),
      company: {
        id_company: parseInt(user.id_company),
      },
      person: {
        id_person: parseInt(user.id_person),
        academic: {
          id_academic: parseInt(user.id_academic),
          title_academic: user.title_academic.trim(),
          abbreviation_academic: user.abbreviation_academic.trim(),
          level_academic: user.level_academic.trim(),
        },
        job: {
          id_job: parseInt(user.id_job),
          name_job: user.name_job.trim(),
          address_job: user.address_job.trim(),
          phone_job: user.phone_job.trim(),
          position_job: user.position_job.trim(),
        },
        dni_person: user.dni_person.trim(),
        name_person: user.name_person.trim(),
        last_name_person: user.last_name_person.trim(),
        address_person: user.address_person.trim(),
        phone_person: user.phone_person.trim(),
      },
      type_user: {
        id_type_user: parseInt(user.id_type_user),
      },
    };
    /**
     * Update
     */
    this._userService
      .update(user)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (_user: User) => {
          if (_user) {
            this._notificationService.success(
              'Usuario actualizado correctamente'
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
}
