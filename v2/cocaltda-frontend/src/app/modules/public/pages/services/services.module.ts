import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CashiersComponent } from '../services/cashiers/cashiers.component';
import { InsuranceComponent } from '../services/insurance/insurance.component';
import { MedicalCareComponent } from '../services/medical-care/medical-care.component';
import { PaymentsComponent } from '../services/payments/payments.component';
import { TransfersComponent } from '../services/transfers/transfers.component';
import { DebitCardComponent } from './debit-card/debit-card.component';

const servicesRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'transfers',
  },
  {
    path: 'transfers',
    component: TransfersComponent,
  },
  {
    path: 'payments',
    component: PaymentsComponent,
  },
  {
    path: 'debit-card',
    component: DebitCardComponent,
  },
  // {
  //   path: 'cashiers',
  //   component: CashiersComponent,
  // },
  {
    path: 'medical-care',
    component: MedicalCareComponent,
  },
  {
    path: 'insurance',
    component: InsuranceComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(servicesRoutes),
    CommonModule,
    /**
     * Shared
     */
    SharedModule,
  ],
  declarations: [
    DebitCardComponent,
    CashiersComponent,
    InsuranceComponent,
    MedicalCareComponent,
    PaymentsComponent,
    TransfersComponent,
  ],
})
export class ServicesModule {}
