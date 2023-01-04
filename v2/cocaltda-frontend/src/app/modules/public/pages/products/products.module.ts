import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AccountsComponent } from './accounts/accounts.component';
import { CreditsComponent } from './credits/credits.component';
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
    path: 'accounts',
    component: AccountsComponent,
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
    MatTooltipModule,

    /**
     * Shared
     */
    SharedModule,
  ],
  declarations: [CreditsComponent, AccountsComponent, InvestmentsComponent],
})
export class ProductsModule {}
