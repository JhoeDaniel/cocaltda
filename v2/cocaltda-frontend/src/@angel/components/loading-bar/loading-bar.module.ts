import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AngelLoadingBarComponent } from '../loading-bar/loading-bar.component';

@NgModule({
  declarations: [AngelLoadingBarComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [AngelLoadingBarComponent],
})
export class AngelLoadingBarModule {}
