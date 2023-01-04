import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { HomeComponent } from './home/home.component';

const reportRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(reportRoutes),
    FormsModule,
    CommonModule,
    MatTooltipModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ReportModule {}
