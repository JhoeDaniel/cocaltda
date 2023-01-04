import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthModule } from 'app/core/auth/auth.module';
import { IconsModule } from './icons/icons.module';

@NgModule({
  imports: [AuthModule, IconsModule],
})
export class CoreModule {
  /**
   * Constructor
   */
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    // Do not allow multiple injections
    if (parentModule) {
      throw new Error(
        'CoreModule ya se ha cargado. Importe este módulo solo en AppModule.'
      );
    }
  }
}
