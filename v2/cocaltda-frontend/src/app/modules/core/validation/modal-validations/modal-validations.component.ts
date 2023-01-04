import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppInitialData } from 'app/core/app/app.type';
import { AuthService } from 'app/core/auth/auth.service';
import { LayoutService } from 'app/layout/layout.service';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ModalValidationService } from '../modal-validation/modal-validation.service';
import { ValidationService } from '../validation.service';
import {
  TYPE_VALIDATION,
  TYPE_VALIDATION_ENUM,
  Validation,
  _typeValidation,
} from '../validation.types';
import { ModalValidationsService } from './modal-validations.service';

@Component({
  selector: 'app-modal-validations',
  templateUrl: './modal-validations.component.html',
})
export class ModalValidationsComponent implements OnInit {
  id_company: string = '';

  count: number = 0;
  validations$!: Observable<Validation[]>;

  private data!: AppInitialData;
  /**
   * Type Enum TYPE_VALIDATION
   */
  typeValidation: TYPE_VALIDATION_ENUM[] = _typeValidation;
  /**
   * Type Enum TYPE_VALIDATION
   */

  searchInputControl: FormControl = new FormControl();
  selectedValidation!: Validation;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  /**
   * isOpenModal
   */
  isOpenModal: boolean = false;
  /**
   * isOpenModal
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _store: Store<{ global: AppInitialData }>,
    private _changeDetectorRef: ChangeDetectorRef,
    private _validationService: ValidationService,
    private _layoutService: LayoutService,
    private _authService: AuthService,
    private _modalValidationsService: ModalValidationsService,
    private _modalValidationService: ModalValidationService
  ) {}

  ngOnInit(): void {
    this.id_company = this._data.id_company;
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
     * Get the validations
     */
    this.validations$ = this._validationService.validations$;
    /**
     *  byCompanyQueryRead *
     */
    this._validationService
      .byCompanyQueryRead(this.id_company, '*')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((validations: Validation[]) => {
        /**
         * Update the counts
         */
        this.count = validations.length;
        /**
         * Mark for check
         */
        this._changeDetectorRef.markForCheck();
      });
    /**
     *  Count Subscribe
     */
    this._validationService.validations$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((validations: Validation[]) => {
        /**
         * Update the counts
         */
        this.count = validations.length;
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
          return this._validationService.queryRead(query.toLowerCase());
        })
      )
      .subscribe();
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
   * getTypeValidationEnum
   */
  getTypeValidationEnum(
    type_validation: TYPE_VALIDATION
  ): TYPE_VALIDATION_ENUM {
    return this.typeValidation.find(
      (e_validation) => e_validation.value_type == type_validation
    )!;
  }
  /**
   * Track by function for ngFor loops
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
  /**
   * closeModalValidations
   */
  closeModalValidations(): void {
    this._modalValidationsService.closeModalValidations();
  }
  /**
   * openModalValidation
   * @param id_Validation
   */
  openModalValidation(id_Validation: string): void {
    this._modalValidationService.openModalValidation(id_Validation);
  }
}
