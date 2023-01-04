import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngelMasonryComponent } from '../../components/masonry/masonry.component';

@NgModule({
  declarations: [AngelMasonryComponent],
  imports: [CommonModule],
  exports: [AngelMasonryComponent],
})
export class AngelMasonryModule {}
