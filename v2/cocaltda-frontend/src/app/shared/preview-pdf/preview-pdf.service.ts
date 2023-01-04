import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from 'app/layout/layout.service';
import { PreviewPdfComponent } from './preview-pdf.component';

@Injectable({
  providedIn: 'root',
})
export class PreviewPdfService {
  constructor(
    private _dialog: MatDialog,
    private _layoutService: LayoutService
  ) {}
  _dialogRef: any;

  openPreviewPdf(src: ArrayBuffer | string) {
    this._layoutService.setOpenModal(true);
    return (this._dialogRef = this._dialog.open(PreviewPdfComponent, {
      minHeight: 'inherit',
      maxHeight: 'inherit',
      height: 'auto',
      width: '50rem',
      maxWidth: '',
      panelClass: ['mat-dialog-cont'],
      disableClose: true,
      data: {
        src,
      },
    }));
  }

  closePreviewPdf() {
    this._dialogRef.close();
  }
}
