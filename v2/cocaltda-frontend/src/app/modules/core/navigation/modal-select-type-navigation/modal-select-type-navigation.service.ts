import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from 'app/layout/layout.service';
import { ModalSelectTypeNavigationComponent } from './modal-select-type-navigation.component';

@Injectable({
  providedIn: 'root',
})
export class ModalSelectTypeNavigationService {
  constructor(
    private _dialog: MatDialog,
    private _layoutService: LayoutService
  ) {}
  dialogRef: any;

  openModalSelectTypeNavigation() {
    this._layoutService.setOpenModal(true);

    return (this.dialogRef = this._dialog.open(
      ModalSelectTypeNavigationComponent,
      {
        minHeight: 'inherit',
        maxHeight: 'inherit',
        height: 'auto',
        width: '32rem',
        maxWidth: '',
        panelClass: ['mat-dialog-cont'],
        data: {},
        disableClose: true,
      }
    ));
  }

  closeModalSelectTypeNavigation() {
    this.dialogRef.close();
  }
}
