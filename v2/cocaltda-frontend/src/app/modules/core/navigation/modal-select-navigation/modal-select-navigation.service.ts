import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from 'app/layout/layout.service';
import { ModalSelectNavigationComponent } from './modal-select-navigation.component';

@Injectable({
  providedIn: 'root',
})
export class ModalSelectNavigationService {
  constructor(
    private _dialog: MatDialog,
    private _layoutService: LayoutService
  ) {}
  dialogRef: any;

  openModalSelectNavigation() {
    this._layoutService.setOpenModal(true);

    return (this.dialogRef = this._dialog.open(ModalSelectNavigationComponent, {
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

  closeModalSelectNavigation() {
    this.dialogRef.close();
  }
}
