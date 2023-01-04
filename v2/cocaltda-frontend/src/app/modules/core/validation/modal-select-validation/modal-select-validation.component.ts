import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ValidationService } from '../validation.service';
import { Validation } from '../validation.types';
import { ModalSelectValidationService } from './modal-select-validation.service';

@Component({
  selector: 'app-modal-select-validation',
  templateUrl: './modal-select-validation.component.html',
})
export class ModalSelectValidationComponent implements OnInit {
  id_validation: string = '';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  listValidation: Validation[] = [];
  selectValidationForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _formBuilder: FormBuilder,
    private _validationService: ValidationService,
    private _modalSelectValidationService: ModalSelectValidationService
  ) {}

  ngOnInit(): void {
    /**
     * get the list of validation
     */
    this._validationService
      .queryRead('*')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_validations: Validation[]) => {
        this.listValidation = _validations;
      });
    /**
     * form
     */
    this.selectValidationForm = this._formBuilder.group({
      id_validation: ['', [Validators.required]],
    });
  }
  /**
   * patchForm
   */
  patchForm(): void {
    this.selectValidationForm.patchValue({
      id_validation: this.selectValidationForm.getRawValue().id_validation,
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
  /**
   * changeSelect
   */
  changeSelect(): void {
    this.id_validation = this.selectValidationForm.getRawValue().id_validation;
    this.patchForm();
  }
  /**
   * closeModalSelectValidation
   */
  closeModalSelectValidation(): void {
    this._modalSelectValidationService.closeModalSelectValidation();
  }
}
