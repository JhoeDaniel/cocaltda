import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { HomeComponent } from './home/home.component';

const coreRoutes: Route[] = [
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
  // {
  //   path: 'company',
  //   canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard],
  //   loadChildren: () =>
  //     import('./company/company.module').then((m) => m.CompanyModule),
  // },
  {
    path: 'validation',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./validation/validation.module').then((m) => m.ValidationModule),
  },
  // {
  //   path: 'navigation',
  //   canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard],
  //   loadChildren: () =>
  //     import('./navigation/navigation.module').then((m) => m.NavigationModule),
  // },
  // {
  //   path: 'profile',
  //   canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard],
  //   loadChildren: () =>
  //     import('./profile/profile.module').then((m) => m.ProfileModule),
  // },
  // {
  //   path: 'type-user',
  //   canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard],
  //   loadChildren: () =>
  //     import('./type-user/type-user.module').then((m) => m.TypeUserModule),
  // },
  // {
  //   path: 'user',
  //   canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard],
  //   loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  // },
  // {
  //   path: 'session',
  //   canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard],
  //   loadChildren: () =>
  //     import('./session/session.module').then((m) => m.SessionModule),
  // },
  // {
  //   path: 'system-event',
  //   canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard],
  //   loadChildren: () =>
  //     import('./system-event/system-event.module').then(
  //       (m) => m.SystemEventModule
  //     ),
  // },
  // {
  //   path: 'settings',
  //   canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard],
  //   loadChildren: () =>
  //     import('./settings/settings.module').then((m) => m.SettingsModule),
  // },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(coreRoutes),
    FormsModule,
    CommonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
})
export class CoreModule {}
