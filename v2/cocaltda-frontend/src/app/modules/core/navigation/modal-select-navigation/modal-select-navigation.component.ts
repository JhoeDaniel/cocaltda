import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from '../navigation.service';
import { Navigation } from '../navigation.types';
import { ModalSelectNavigationService } from './modal-select-navigation.service';

@Component({
  selector: 'app-modal-select-navigation',
  templateUrl: './modal-select-navigation.component.html',
})
export class ModalSelectNavigationComponent implements OnInit {
  id_navigation: string = '';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  listNavigation: Navigation[] = [];
  selectNavigationForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _formBuilder: FormBuilder,
    private _navigationService: NavigationService,
    private _modalSelectNavigationService: ModalSelectNavigationService
  ) {}

  ngOnInit(): void {
    /**
     * get the list of navigation
     */
    this._navigationService
      .queryRead('*')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_navigations: Navigation[]) => {
        this.listNavigation = _navigations;
      });
    /**
     * form
     */
    this.selectNavigationForm = this._formBuilder.group({
      id_navigation: ['', [Validators.required]],
    });
  }
  /**
   * patchForm
   */
  patchForm(): void {
    this.selectNavigationForm.patchValue({
      id_navigation: this.selectNavigationForm.getRawValue().id_navigation,
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
    this.id_navigation = this.selectNavigationForm.getRawValue().id_navigation;
    this.patchForm();
  }
  /**
   * closeModalSelectNavigation
   */
  closeModalSelectNavigation(): void {
    this._modalSelectNavigationService.closeModalSelectNavigation();
  }
}
