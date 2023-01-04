import { ModuleWithProviders, NgModule } from '@angular/core';
import { ANGEL_APP_CONFIG } from './config.constants';
import { AngelConfigService } from './config.service';

@NgModule()
export class AngelConfigModule {
  /**
   * Constructor
   */
  constructor(private _angelConfigService: AngelConfigService) {}

  /**
   * forRoot method for setting user configuration
   *
   * @param config
   */
  static forRoot(config: any): ModuleWithProviders<AngelConfigModule> {
    return {
      ngModule: AngelConfigModule,
      providers: [
        {
          provide: ANGEL_APP_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
