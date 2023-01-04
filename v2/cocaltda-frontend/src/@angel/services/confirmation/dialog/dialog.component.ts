import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngelConfirmationConfig } from '../confirmation.types';

@Component({
  selector: 'angel-confirmation-dialog',
  templateUrl: './dialog.component.html',
  styles: [
    /* language=SCSS */
    `
      .angel-confirmation-dialog-panel {
        @screen md {
          @apply w-128;
        }

        .mat-dialog-container {
          padding: 0 !important;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AngelConfirmationDialogComponent implements OnInit {
  /**
   * Constructor
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AngelConfirmationConfig,
    public matDialogRef: MatDialogRef<AngelConfirmationDialogComponent>
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
}
