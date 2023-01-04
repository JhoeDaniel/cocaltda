import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LayoutService } from 'app/layout/layout.service';
import { merge } from 'lodash-es';
import { AngelConfirmationConfig } from './confirmation.types';
import { AngelConfirmationDialogComponent } from './dialog/dialog.component';

@Injectable()
export class AngelConfirmationService {
  private _defaultConfig: AngelConfirmationConfig = {
    title: 'Confirmar acción',
    message: '¿Estás seguro de que quieres confirmar esta acción?',
    icon: {
      show: true,
      name: 'heroicons_outline:exclamation',
      color: 'primary',
    },
    actions: {
      confirm: {
        show: true,
        label: 'Confirmar',
        color: 'primary',
      },
      cancel: {
        show: true,
        label: 'Cancelar',
      },
    },
    dismissible: false,
  };

  /**
   * Constructor
   */
  constructor(
    private _matDialog: MatDialog,
    private _layoutService: LayoutService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  open(
    config: AngelConfirmationConfig = {}
  ): MatDialogRef<AngelConfirmationDialogComponent> {
    // Merge the user config with the default config
    const userConfig = merge({}, this._defaultConfig, config);

    /**
     *
     * Set isOpenModal
     */
    this._layoutService.setOpenModal(true);

    // Open the dialog
    return this._matDialog.open(AngelConfirmationDialogComponent, {
      autoFocus: false,
      disableClose: !userConfig.dismissible,
      data: userConfig,
      panelClass: 'angel-confirmation-dialog-panel',
    });
  }

  closeAll() {
    this._matDialog.closeAll();
    this._layoutService.setOpenModal(false);
  }
}
