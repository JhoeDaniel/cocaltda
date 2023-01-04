import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from 'app/layout/layout.service';
import { SettingsCenterComponent } from './settings-center.component';

@Injectable({
  providedIn: 'root',
})
export class SettingsCenterService {
  constructor(
    private _dialog: MatDialog,
    private _layoutService: LayoutService
  ) {}
  dialogRef: any;

  openDrawerSettings() {
    this._layoutService.setOpenModal(true);

    return (this.dialogRef = this._dialog.open(SettingsCenterComponent, {
      minHeight: 'inherit',
      maxHeight: '90vh',
      height: 'auto',
      width: '32rem',
      maxWidth: '',
      panelClass: ['mat-dialog-cont'],
    }));
  }

  closeDrawerSettings() {
    this.dialogRef.close();
  }
}
