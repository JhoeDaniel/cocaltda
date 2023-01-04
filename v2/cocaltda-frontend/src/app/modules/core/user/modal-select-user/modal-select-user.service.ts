import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from 'app/layout/layout.service';
import { ModalSelectUserComponent } from './modal-select-user.component';

@Injectable({
  providedIn: 'root',
})
export class ModalSelectUserService {
  constructor(
    private _dialog: MatDialog,
    private _layoutService: LayoutService
  ) {}
  dialogRef: any;

  openModalSelectUser() {
    this._layoutService.setOpenModal(true);

    return (this.dialogRef = this._dialog.open(ModalSelectUserComponent, {
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

  closeModalSelectUser() {
    this.dialogRef.close();
  }
}
