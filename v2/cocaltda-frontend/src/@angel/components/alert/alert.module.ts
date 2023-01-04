import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AngelAlertComponent } from './alert.component';

@NgModule({
  declarations: [AngelAlertComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [AngelAlertComponent],
})
export class AngelAlertModule {}
