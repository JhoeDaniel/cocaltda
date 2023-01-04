import { NgModule } from '@angular/core';
import { AngelFindByKeyPipe } from './find-by-key.pipe';

@NgModule({
  declarations: [AngelFindByKeyPipe],
  exports: [AngelFindByKeyPipe],
})
export class AngelFindByKeyPipeModule {}
