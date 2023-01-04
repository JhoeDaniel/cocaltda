import { NgModule } from '@angular/core';
import { AngelScrollbarDirective } from './scrollbar.directive';

@NgModule({
  declarations: [AngelScrollbarDirective],
  exports: [AngelScrollbarDirective],
})
export class AngelScrollbarModule {}
