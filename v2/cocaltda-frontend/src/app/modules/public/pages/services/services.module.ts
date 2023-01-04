import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CashiersComponent } from '../services/cashiers/cashiers.component';
import { InsuranceComponent } from '../services/insurance/insurance.component';
import { MedicalCareComponent } from '../services/medical-care/medical-care.component';
import { PaymentsComponent } from '../services/payments/payments.component';
import { TransfersComponent } from '../services/transfers/transfers.component';
import { DebitCardComponent } from './debit-card/debit-card.component';
import { ContainerVirtualBankingComponent } from './virtual-banking/container-virtual-banking/container-virtual-banking.component';
import { ModalVirtualBankingComponent } from './virtual-banking/modal-virtual-banking/modal-virtual-banking.component';

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
  {
    path: 'virtual-banking',
    component: ContainerVirtualBankingComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(servicesRoutes),
    CommonModule,
    MatTooltipModule,
    MatDialogModule,
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
    ModalVirtualBankingComponent,
  ],
})
export class ServicesModule {}
