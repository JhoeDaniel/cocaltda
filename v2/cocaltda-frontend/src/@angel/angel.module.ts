import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AngelConfirmationModule } from './services/confirmation';
import { AngelLoadingModule } from './services/loading';
import { AngelMediaWatcherModule } from './services/media-watcher/media-watcher.module';
import { AngelSplashScreenModule } from './services/splash-screen/splash-screen.module';
import { AngelUtilsModule } from './services/utils/utils.module';

@NgModule({
  imports: [
    AngelConfirmationModule,
    AngelLoadingModule,
    AngelMediaWatcherModule,
    AngelSplashScreenModule,
    AngelUtilsModule,
  ],
  providers: [
    {
      // Disable 'theme' sanity check
      provide: MATERIAL_SANITY_CHECKS,
      useValue: {
        doctype: true,
        theme: false,
        version: true,
      },
    },
    {
      // Use the 'fill' appearance on Angular Material form fields by default
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill',
      },
    },
  ],
})
export class AngelModule {
  /**
   * Constructor
   */
  constructor(@Optional() @SkipSelf() parentModule?: AngelModule) {
    if (parentModule) {
      throw new Error(
        'AngelModule has already been loaded. Import this module in the AppModule only!'
      );
    }
  }
}
