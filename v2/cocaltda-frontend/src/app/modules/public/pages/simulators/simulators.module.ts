import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CreditsComponent } from './credits/credits.component';
import { InvestmentsComponent } from './investments/investments.component';
import { ModalSendInformationComponent } from './modal-send-information/modal-send-information.component';

const simulatorsRoutes: Route[] = [
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
    path: 'investments',
    component: InvestmentsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(simulatorsRoutes),
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule,
    /**
     * Shared
     */
    SharedModule,
  ],
  declarations: [
    CreditsComponent,
    InvestmentsComponent,
    ModalSendInformationComponent,
  ],
})
export class SimulatorsModule {}
