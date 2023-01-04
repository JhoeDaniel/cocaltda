import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from 'app/layout/layout.service';
import { ModalValidationComponent } from './modal-validation.component';

@Injectable({
  providedIn: 'root',
})
export class ModalValidationService {
  constructor(
    private _dialog: MatDialog,
    private _layoutService: LayoutService
  ) {}
  _dialogRef: any;

  openModalValidation(id_Validation: string) {
    this._layoutService.setOpenModal(true);

    return (this._dialogRef = this._dialog.open(ModalValidationComponent, {
      minHeight: 'inherit',
      maxHeight: '90vh',
      height: 'auto',
      width: '30rem',
      maxWidth: '',
      panelClass: ['mat-dialog-cont'],
      disableClose: true,
      data: {
        id_Validation,
      },
    }));
  }

  closeModalValidation() {
    this._dialogRef.close();
  }
}
