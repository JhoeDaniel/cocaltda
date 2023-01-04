import { NgModule } from '@angular/core';
import { AngelUtilsService } from './utils.service';

@NgModule({
  providers: [AngelUtilsService],
})
export class AngelUtilsModule {
  /**
   * Constructor
   */
  constructor(private _angelUtilsService: AngelUtilsService) {}
}
