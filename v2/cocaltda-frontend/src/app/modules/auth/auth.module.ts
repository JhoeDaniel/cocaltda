import { AngelAlertModule } from '@angel/components/alert';
import { AngelCardModule } from '@angel/components/card';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { SharedModule } from 'app/shared/shared.module';
import { AuthConfirmationRequiredComponent } from './confirmation-required/confirmation-required.component';
import { AuthForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthSignInComponent } from './sign-in/sign-in.component';
import { AuthSignOutComponent } from './sign-out/sign-out.component';
import { SignUpMessageComponent } from './sign-up-message/sign-up-message.component';
import { AuthSignUpComponent } from './sign-up/sign-up.component';
import { AuthUnlockSessionComponent } from './unlock-session/unlock-session.component';

const authRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: 'confirmation-required',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: AuthConfirmationRequiredComponent,
  },
  {
    path: 'forgot-password',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: AuthForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: AuthResetPasswordComponent,
  },
  {
    path: 'sign-in',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: AuthSignInComponent,
  },
  // {
  //   path: 'sign-up',
  //   canActivate: [NoAuthGuard],
  //   canActivateChild: [NoAuthGuard],
  //   component: AuthSignUpComponent,
  // },
  {
    path: 'sign-up-message',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: SignUpMessageComponent,
  },
  {
    path: 'sign-out',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: AuthSignOutComponent,
  },
  {
    path: 'unlock-session',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: AuthUnlockSessionComponent,
  },
];

@NgModule({
  declarations: [
    AuthSignInComponent,
    AuthResetPasswordComponent,
    AuthConfirmationRequiredComponent,
    AuthForgotPasswordComponent,
    AuthSignOutComponent,
    AuthSignUpComponent,
    AuthUnlockSessionComponent,
    SignUpMessageComponent,
  ],
  imports: [
    RouterModule.forChild(authRoutes),
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    AngelCardModule,
    AngelAlertModule,
    SharedModule,
  ],
})
export class AuthModule {}
