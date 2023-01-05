import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { NotfoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GenderIndicatorsComponent } from './pages/gender-indicators/gender-indicators.component';
import { IndexComponent } from './pages/index/index.component';
import { InstitutionComponent } from './pages/institution/institution.component';
import { HistoryComponent } from './pages/institution/sections/history/history.component';
import { PrivacyPolicyCookiesComponent } from './pages/privacy-policy-cookies/privacy-policy-cookies.component';
import { TermsConditionsComponent } from './pages/terms-Conditions/terms-Conditions.component';
import { TransparencyComponent } from './pages/transparency/transparency.component';
import { SharedModule } from './shared/shared.module';

const publicRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'index',
  },
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: 'institution',
    component: InstitutionComponent,
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./pages/services/services.module').then((m) => m.ServicesModule),
  },
  {
    path: 'simulators',
    loadChildren: () =>
      import('./pages/simulators/simulators.module').then(
        (m) => m.SimulatorsModule
      ),
  },
  {
    path: 'transparency',
    component: TransparencyComponent,
  },
  {
    path: 'gender-indicators',
    component: GenderIndicatorsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'privacy-policy-cookies',
    component: PrivacyPolicyCookiesComponent,
  },
  {
    path: 'terms-Conditions',
    component: TermsConditionsComponent,
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'not-found',
    component: NotfoundComponent,
  },
];

@NgModule({
  declarations: [
    IndexComponent,
    NotfoundComponent,
    InstitutionComponent,
    HistoryComponent,
    PrivacyPolicyCookiesComponent,
    TermsConditionsComponent,
    ContactComponent,
    TransparencyComponent,
    GenderIndicatorsComponent,
  ],
  imports: [
    RouterModule.forChild(publicRoutes),
    FormsModule,
    MatExpansionModule,
    CommonModule,
    MatCardModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,

    /**
     * Shared
     */
    SharedModule,
  ],
})
export class PublicModule {}
