import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { TypeUserService } from '../type-user.service';
import { TypeUser } from '../type-user.types';
import { ModalSelectTypeUserService } from './modal-select-type-user.service';

@Component({
  selector: 'app-modal-select-type-user',
  templateUrl: './modal-select-type-user.component.html',
})
export class ModalSelectTypeUserComponent implements OnInit {
  id_type_user: string = '';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  listTypeUser: TypeUser[] = [];
  selectTypeUserForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _formBuilder: FormBuilder,
    private _typeUserService: TypeUserService,
    private _modalSelectTypeUserService: ModalSelectTypeUserService
  ) {}

  ngOnInit(): void {
    /**
     * get the list of typeUser
     */
    this._typeUserService
      .queryRead('*')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_typeUsers: TypeUser[]) => {
        this.listTypeUser = _typeUsers;
      });
    /**
     * form
     */
    this.selectTypeUserForm = this._formBuilder.group({
      id_type_user: ['', [Validators.required]],
    });
  }
  /**
   * patchForm
   */
  patchForm(): void {
    this.selectTypeUserForm.patchValue({
      id_type_user: this.selectTypeUserForm.getRawValue().id_type_user,
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
    this.id_type_user = this.selectTypeUserForm.getRawValue().id_type_user;
    this.patchForm();
  }
  /**
   * closeModalSelectTypeUser
   */
  closeModalSelectTypeUser(): void {
    this._modalSelectTypeUserService.closeModalSelectTypeUser();
  }
}
