import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AngelConfirmationService } from './confirmation.service';
import { AngelConfirmationDialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [AngelConfirmationDialogComponent],
  imports: [MatButtonModule, MatDialogModule, MatIconModule, CommonModule],
  providers: [AngelConfirmationService],
})
export class AngelConfirmationModule {
  /**
   * Constructor
   */
  constructor(private _angelConfirmationService: AngelConfirmationService) {}
}
