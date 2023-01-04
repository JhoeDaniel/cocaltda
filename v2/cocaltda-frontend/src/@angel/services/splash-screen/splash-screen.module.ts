import { NgModule } from '@angular/core';
import { AngelSplashScreenService } from './splash-screen.service';

@NgModule({
  providers: [AngelSplashScreenService],
})
export class AngelSplashScreenModule {
  /**
   * Constructor
   */
  constructor(private _angelSplashScreenService: AngelSplashScreenService) {}
}
