import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from 'app/layout/layout.service';
import { ModalSelectProfileComponent } from './modal-select-profile.component';

@Injectable({
  providedIn: 'root',
})
export class ModalSelectProfileService {
  constructor(
    private _dialog: MatDialog,
    private _layoutService: LayoutService
  ) {}
  dialogRef: any;

  openModalSelectProfile() {
    this._layoutService.setOpenModal(true);

    return (this.dialogRef = this._dialog.open(ModalSelectProfileComponent, {
      minHeight: 'inherit',
      maxHeight: 'inherit',
      height: 'auto',
      width: '32rem',
      maxWidth: '',
      panelClass: ['mat-dialog-cont'],
      data: {},
      disableClose: true,
    }));
  }

  closeModalSelectProfile() {
    this.dialogRef.close();
  }
}
