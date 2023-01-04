import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from 'app/layout/layout.service';
import { ModalSelectValidationComponent } from './modal-select-validation.component';

@Injectable({
  providedIn: 'root',
})
export class ModalSelectValidationService {
  constructor(
    private _dialog: MatDialog,
    private _layoutService: LayoutService
  ) {}
  dialogRef: any;

  openModalSelectValidation() {
    this._layoutService.setOpenModal(true);

    return (this.dialogRef = this._dialog.open(ModalSelectValidationComponent, {
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

  closeModalSelectValidation() {
    this.dialogRef.close();
  }
}
