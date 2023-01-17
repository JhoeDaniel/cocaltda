import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from 'app/layout/layout.service';
import { ModalSendInformationComponent } from './modal-send-information.component';

@Injectable({
  providedIn: 'root',
})
export class ModalSendInformationService {
  constructor(
    private _dialog: MatDialog,
    private _layoutService: LayoutService
  ) {}
  dialogRef: any;

  openModalSendInformation(subject: string, mailText: string) {
    this._layoutService.setOpenModal(true);

    return (this.dialogRef = this._dialog.open(ModalSendInformationComponent, {
      minHeight: 'inherit',
      maxHeight: 'inherit',
      height: 'auto',
      width: '32rem',
      maxWidth: '',
      panelClass: ['mat-dialog-cont', 'mx-4'],
      data: {
        subject,
        mailText,
      },
      disableClose: true,
    }));
  }

  closeModalSendInformation() {
    this.dialogRef.close();
  }
}
