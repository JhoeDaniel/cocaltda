import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from 'app/layout/layout.service';
import { ModalVirtualBankingComponent } from './modal-virtual-banking.component';

@Injectable({
  providedIn: 'root',
})
export class ModalVirtualBankingService {
  constructor(
    private _dialog: MatDialog,
    private _layoutService: LayoutService
  ) {}
  dialogRef: any;

  openModalVirtualBanking() {
    this._layoutService.setOpenModal(true);

    return (this.dialogRef = this._dialog.open(ModalVirtualBankingComponent, {
      minHeight: 'inherit',
      maxHeight: 'inherit',
      height: 'auto',
      width: '32rem',
      maxWidth: '',
      panelClass: ['mat-dialog-cont'],
      disableClose: true,
    }));
  }

  closeModalVirtualBanking() {
    this.dialogRef.close();
  }
}
