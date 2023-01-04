import { AngelModule } from '@angel';
import { AngelApiModule } from '@angel/api';
import { AngelConfigModule } from '@angel/services/config';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { appConfig } from 'app/core/app/app.config';
import { CoreModule } from 'app/core/core.module';
import { LayoutModule } from 'app/layout/layout.module';
import { environment } from 'environments/environment';
import { MarkdownModule } from 'ngx-markdown';
import { IconsApi } from './core/icons/api';
import { metaReducers, reducers } from './store';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, routerConfig),

    // Angel, AngelConfig & AngelAPI
    AngelModule,
    AngelConfigModule.forRoot(appConfig),
    AngelApiModule.forRoot([IconsApi]),

    // Core module of your application
    CoreModule,

    // Layout module of your application
    LayoutModule,

    // 3rd party modules that require global configuration via forRoot
    MarkdownModule.forRoot({}),
    //store
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    // Material
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-EC' }],
})
export class AppModule {}
