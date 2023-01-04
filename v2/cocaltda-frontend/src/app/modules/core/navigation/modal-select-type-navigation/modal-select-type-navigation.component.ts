import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { TYPE_NAVIGATION_ENUM, _typeNavigation } from '../navigation.types';
import { ModalSelectTypeNavigationService } from './modal-select-type-navigation.service';

@Component({
  selector: 'app-modal-select-type-navigation',
  templateUrl: './modal-select-type-navigation.component.html',
})
export class ModalSelectTypeNavigationComponent implements OnInit {
  type_navigation: string = '';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  listTypeNavigation: TYPE_NAVIGATION_ENUM[] = _typeNavigation;
  selectTypeNavigationForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _formBuilder: FormBuilder,
    private _modalSelectTypeNavigationService: ModalSelectTypeNavigationService
  ) {}

  ngOnInit(): void {
    /**
     * form
     */
    this.selectTypeNavigationForm = this._formBuilder.group({
      type_navigation: ['', [Validators.required]],
    });
  }
  /**
   * patchForm
   */
  patchForm(): void {
    this.selectTypeNavigationForm.patchValue({
      type_navigation:
        this.selectTypeNavigationForm.getRawValue().type_navigation,
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
    this.type_navigation =
      this.selectTypeNavigationForm.getRawValue().type_navigation;
    this.patchForm();
  }
  /**
   * closeModalSelectTypeNavigation
   */
  closeModalSelectTypeNavigation(): void {
    this._modalSelectTypeNavigationService.closeModalSelectTypeNavigation();
  }
}
