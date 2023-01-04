import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from 'app/layout/layout.service';
import { ModalSelectSessionComponent } from './modal-select-session.component';

@Injectable({
  providedIn: 'root',
})
export class ModalSelectSessionService {
  constructor(
    private _dialog: MatDialog,
    private _layoutService: LayoutService
  ) {}
  dialogRef: any;

  openModalSelectSession() {
    this._layoutService.setOpenModal(true);

    return (this.dialogRef = this._dialog.open(ModalSelectSessionComponent, {
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

  closeModalSelectSession() {
    this.dialogRef.close();
  }
}
