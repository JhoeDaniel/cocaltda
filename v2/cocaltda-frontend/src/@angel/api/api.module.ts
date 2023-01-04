import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ANGEL_API_DEFAULT_DELAY } from './api.constants';
import { AngelApiInterceptor } from './api.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AngelApiInterceptor,
      multi: true,
    },
  ],
})
export class AngelApiModule {
  /**
   * AngelApi module default configuration.
   *
   * @param ApiServices - Array of services that register API handlers
   * @param config - Configuration options
   * @param config.delay - Default delay value in milliseconds to apply all responses
   */
  static forRoot(
    ApiServices: any[],
    config?: { delay?: number }
  ): ModuleWithProviders<AngelApiModule> {
    return {
      ngModule: AngelApiModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          deps: [...ApiServices],
          useFactory: () => (): any => null,
          multi: true,
        },
        {
          provide: ANGEL_API_DEFAULT_DELAY,
          useValue: config?.delay ?? 0,
        },
      ],
    };
  }
}
