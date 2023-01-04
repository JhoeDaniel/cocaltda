import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile.types';
import { ModalSelectProfileService } from './modal-select-profile.service';

@Component({
  selector: 'app-modal-select-profile',
  templateUrl: './modal-select-profile.component.html',
})
export class ModalSelectProfileComponent implements OnInit {
  id_profile: string = '';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  listProfile: Profile[] = [];
  selectProfileForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _formBuilder: FormBuilder,
    private _profileService: ProfileService,
    private _modalSelectProfileService: ModalSelectProfileService
  ) {}

  ngOnInit(): void {
    /**
     * get the list of profile
     */
    this._profileService
      .queryRead('*')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_profiles: Profile[]) => {
        this.listProfile = _profiles;
      });
    /**
     * form
     */
    this.selectProfileForm = this._formBuilder.group({
      id_profile: ['', [Validators.required]],
    });
  }
  /**
   * patchForm
   */
  patchForm(): void {
    this.selectProfileForm.patchValue({
      id_profile: this.selectProfileForm.getRawValue().id_profile,
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
    this.id_profile = this.selectProfileForm.getRawValue().id_profile;
    this.patchForm();
  }
  /**
   * closeModalSelectProfile
   */
  closeModalSelectProfile(): void {
    this._modalSelectProfileService.closeModalSelectProfile();
  }
}
