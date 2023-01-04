import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import {
  TYPE_VALIDATION,
  TYPE_VALIDATION_ENUM,
  _typeValidation,
} from '../validation.types';
import { ModalSelectTypeValidationService } from './modal-select-type-validation.service';

@Component({
  selector: 'app-modal-select-type-validation',
  templateUrl: './modal-select-type-validation.component.html',
})
export class ModalSelectTypeValidationComponent implements OnInit {
  type_validation: TYPE_VALIDATION = 'validationPassword';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  listTypeValidation: TYPE_VALIDATION_ENUM[] = _typeValidation;
  selectTypeValidationForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _formBuilder: FormBuilder,
    private _modalTypeValidationService: ModalSelectTypeValidationService
  ) {}

  ngOnInit(): void {
    /**
     * form
     */
    this.selectTypeValidationForm = this._formBuilder.group({
      type_validation: ['', [Validators.required]],
    });
  }
  /**
   * patchForm
   */
  patchForm(): void {
    this.selectTypeValidationForm.patchValue({
      type_validation:
        this.selectTypeValidationForm.getRawValue().type_validation,
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
    this.type_validation =
      this.selectTypeValidationForm.getRawValue().type_validation;
    this.patchForm();
  }
  /**
   * closeModalSelectTypeValidationService
   */
  closeModalSelectTypeValidationService(): void {
    this._modalTypeValidationService.closeModalSelectTypeValidationService();
  }
}
