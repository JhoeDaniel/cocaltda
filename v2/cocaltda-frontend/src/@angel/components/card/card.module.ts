import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngelCardComponent } from './card.component';

@NgModule({
  declarations: [AngelCardComponent],
  imports: [CommonModule],
  exports: [AngelCardComponent],
})
export class AngelCardModule {}
