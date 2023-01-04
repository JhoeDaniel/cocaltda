import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from 'app/layout/layout.service';
import { ModalValidationsComponent } from './modal-validations.component';

@Injectable({
  providedIn: 'root',
})
export class ModalValidationsService {
  constructor(
    private _dialog: MatDialog,
    private _layoutService: LayoutService
  ) {}
  _dialogRef: any;

  openModalValidations(id_company: string) {
    this._layoutService.setOpenModal(true);
    return (this._dialogRef = this._dialog.open(ModalValidationsComponent, {
      minHeight: 'inherit',
      maxHeight: 'inherit',
      height: 'auto',
      width: '35rem',
      maxWidth: '',
      panelClass: ['mat-dialog-cont'],
      disableClose: true,
      data: {
        id_company,
      },
    }));
  }

  closeModalValidations() {
    this._dialogRef.close();
  }
}
