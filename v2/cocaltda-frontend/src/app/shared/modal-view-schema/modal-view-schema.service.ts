import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from 'app/layout/layout.service';
import { ModalViewSchemaComponent } from './modal-view-schema.component';

@Injectable({
  providedIn: 'root',
})
export class ModalViewSchemaService {
  constructor(
    private _dialog: MatDialog,
    private _layoutService: LayoutService
  ) {}

  dialogRef: any;

  openModalViewSchemaService(schema: any) {
    this._layoutService.setOpenModal(true);
    return (this.dialogRef = this._dialog.open(ModalViewSchemaComponent, {
      minHeight: 'inherit',
      maxHeight: 'inherit',
      height: 'auto',
      width: '32rem',
      maxWidth: '',
      panelClass: ['mat-dialog-cont'],
      data: {
        schema,
      },
      disableClose: true,
    }));
  }

  closeModalViewSchemaService() {
    this.dialogRef.close();
  }
}
