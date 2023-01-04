import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CompanyService } from '../company.service';
import { Company } from '../company.types';
import { ModalSelectCompanyService } from './modal-select-company.service';

@Component({
  selector: 'app-modal-select-company',
  templateUrl: './modal-select-company.component.html',
})
export class ModalSelectCompanyComponent implements OnInit {
  id_company: string = '';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  listCompany: Company[] = [];
  selectCompanyForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _formBuilder: FormBuilder,
    private _companyService: CompanyService,
    private _modalSelectCompanyService: ModalSelectCompanyService
  ) {}

  ngOnInit(): void {
    /**
     * get the list of company
     */
    this._companyService
      .queryRead('*')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_companys: Company[]) => {
        this.listCompany = _companys;
      });
    /**
     * form
     */
    this.selectCompanyForm = this._formBuilder.group({
      id_company: ['', [Validators.required]],
    });
  }
  /**
   * patchForm
   */
  patchForm(): void {
    this.selectCompanyForm.patchValue({
      id_company: this.selectCompanyForm.getRawValue().id_company,
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
    this.id_company = this.selectCompanyForm.getRawValue().id_company;
    this.patchForm();
  }
  /**
   * closeModalSelectCompany
   */
  closeModalSelectCompany(): void {
    this._modalSelectCompanyService.closeModalSelectCompany();
  }
}
