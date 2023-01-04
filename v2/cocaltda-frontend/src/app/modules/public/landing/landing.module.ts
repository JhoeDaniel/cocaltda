import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Route, RouterModule } from '@angular/router';
import { BlackFridayComponent } from './black-friday/black-friday.component';

const landingRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'blackFriday',
  },
  {
    path: 'blackFriday',
    component: BlackFridayComponent,
  },
];

@NgModule({
  declarations: [BlackFridayComponent],
  imports: [
    RouterModule.forChild(landingRoutes),
    FormsModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class LandingModule {}
