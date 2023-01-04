import { angelAnimations } from '@angel/animations';
import { AngelAlertType } from '@angel/components/alert';
import { AngelValidators } from '@angel/validators';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppData, appData } from 'app/core/app/app.data';
import { MessageAPI } from 'app/core/app/app.type';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { SecurityCap } from 'app/utils/SecurityCap';
import { Subject, timer } from 'rxjs';
import { finalize, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: angelAnimations,
})
export class AuthResetPasswordComponent implements OnInit {
  countdown: number = 5;
  countdownMapping: any = {
    '=1': '# segundo',
    other: '# segundos',
  };

  _app_data: AppData = appData;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  private userforgotPassword: string = '';
  private tokenforgotPassword: string = '';
  statusButton: boolean = true;

  alert: { type: AngelAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  resetPasswordForm!: FormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _securityCap: SecurityCap
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.resetPasswordForm = this._formBuilder.group(
      {
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      },
      {
        validators: AngelValidators.mustMatch('password', 'passwordConfirm'),
      }
    );

    if (
      !history.state ||
      !history.state._name_user ||
      !history.state._token ||
      history.state._name_user == '' ||
      history.state._token == ''
    ) {
      const redirectURL =
        this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
        '/signed-in-redirect';

      // Navigate to the redirect url
      this._router.navigateByUrl(redirectURL);
    } else {
      // Decrypt information
      this.userforgotPassword = this._securityCap.aesDecrypt(
        history.state._name_user
      );
      this.tokenforgotPassword = history.state._token;
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Reset password
   */
  resetPassword(): void {
    // Return if the form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }

    // Disable the form
    this.resetPasswordForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Check the access token expire date
    if (!AuthUtils.isTokenExpired(this.tokenforgotPassword)) {
      // Send the request to the server
      this._authService
        .resetPassword(
          this.userforgotPassword,
          this.resetPasswordForm.get('password')!.value
        )
        .pipe(
          finalize(() => {
            // Show the alert
            this.showAlert = true;
          }),
          takeUntil(this._unsubscribeAll)
        )
        .subscribe({
          next: () => {
            // Re-enable the form
            this.resetPasswordForm.disable();
            // change the state of button for changed logical button
            this.statusButton = false;
            // Reset the form
            this.resetPasswordForm.reset();
            this.alert = {
              type: 'success',
              message: 'Tu contraseña ha sido restablecida.',
            };

            this.redirect();
          },
          error: (error: { error: MessageAPI }) => {
            // Re-enable the form
            this.resetPasswordForm.enable();
            // change the state of button for changed logical button
            this.statusButton = true;
            // Reset the form
            this.alert = {
              type: 'error',
              message: !error.error
                ? '¡Error interno!, consulte al administrador.'
                : !error.error.description
                ? '¡Error interno!, consulte al administrador.'
                : error.error.description,
            };
          },
        });
    } else {
      this.alert = {
        type: 'error',
        message: '¡Token expirado!',
      };
      this.statusButton = false;
      this.showAlert = true;

      this.redirect();
    }
  }

  redirect() {
    // Redirect after the countdown
    timer(1000, 1000)
      .pipe(
        finalize(() => {
          const redirectURL =
            this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
            '/signed-in-redirect';

          // Navigate to the redirect url
          this._router.navigateByUrl(redirectURL);
        }),
        takeWhile(() => this.countdown > 0),
        tap(() => this.countdown--)
      )
      .subscribe();
  }
}
