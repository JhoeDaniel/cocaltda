import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CreditsComponent } from './credits/credits.component';
import { DepositsComponent } from './deposits/deposits.component';
import { InvestmentsComponent } from './investments/investments.component';

const productsRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'credits',
  },
  {
    path: 'credits',
    component: CreditsComponent,
  },
  {
    path: 'deposits',
    component: DepositsComponent,
  },
  {
    path: 'investments',
    component: InvestmentsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(productsRoutes),
    CommonModule,
    /**
     * Shared
     */
    SharedModule,
  ],
  declarations: [CreditsComponent, DepositsComponent, InvestmentsComponent],
})
export class ProductsModule {}
