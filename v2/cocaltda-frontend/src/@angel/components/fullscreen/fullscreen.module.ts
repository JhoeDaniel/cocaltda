import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngelFullscreenComponent } from './fullscreen.component';

@NgModule({
  declarations: [AngelFullscreenComponent],
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, CommonModule],
  exports: [AngelFullscreenComponent],
})
export class AngelFullscreenModule {}
