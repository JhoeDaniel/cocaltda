import { angelAnimations } from '@angel/animations';
import { AngelAlertType } from '@angel/components/alert';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppData, appData } from 'app/core/app/app.data';
import { MessageAPI } from 'app/core/app/app.type';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { SecurityCap } from 'app/utils/SecurityCap';
import { Subject, timer } from 'rxjs';
import { finalize, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: angelAnimations,
})
export class AuthForgotPasswordComponent implements OnInit {
  countdown: number = 5;
  countdownMapping: any = {
    '=1': '# segundo',
    other: '# segundos',
  };
  statusButton: boolean = true;
  statusButtonVerificationCode: boolean = true;

  _app_data: AppData = appData;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  private attempts: number = 3;
  activeSectionCode: boolean = false;

  private userforgotPassword: string = '';
  private tokenforgotPassword: string = '';

  alert: { type: AngelAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  forgotPasswordForm!: FormGroup;
  verificationCodeForm!: FormGroup;
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

    this.forgotPasswordForm = this._formBuilder.group({
      name_user: new FormControl(
        {
          value: 'angelloor.dev@gmail.com',
          disabled: false,
        },
        [Validators.required, Validators.email]
      ),
    });

    this.verificationCodeForm = this._formBuilder.group({
      code: [''],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Send the reset link
   */
  sendConfirmationCode(): void {
    // Return if the form is invalid
    if (this.forgotPasswordForm!.invalid) {
      return;
    }

    // Disable the form
    this.forgotPasswordForm!.disable();

    // Hide the alert
    this.showAlert = false;

    // Forgot password
    const name_user = this.forgotPasswordForm!.get('name_user')!.value;

    this._authService
      .forgotPassword(name_user)
      .pipe(
        finalize(() => {
          // Show the alert
          this.showAlert = true;
        }),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe({
        next: (response) => {
          this.statusButton = false;

          this.tokenforgotPassword = response.body;
          this.userforgotPassword = name_user;

          this.forgotPasswordForm.disable();
          // Active Next Section
          this.activeSectionCode = true;

          this.alert = {
            type: 'success',
            message: `¡Se envió el código de confirmación a ${name_user}, ingréselo para continuar!`,
          };

          this.verificationCodeForm.controls['code'].setValidators([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
          ]);
        },
        error: (error: { error: MessageAPI }) => {
          this.statusButton = false;
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
  }

  codeVerification(): void {
    this.attempts--;
    const _code = this.verificationCodeForm!.get('code')!.value;
    // Check the access token expire date
    if (!AuthUtils.isTokenExpired(this.tokenforgotPassword)) {
      // Decode token
      const _decode = AuthUtils._decodeToken(this.tokenforgotPassword);
      if (_code == _decode.code) {
        // Navigate reset-password
        this.showAlert = false;
        this._router.navigateByUrl('auth/reset-password', {
          state: {
            _name_user: this._securityCap.aesEncrypt(this.userforgotPassword),
            _token: this.tokenforgotPassword,
          },
        });
      } else if (this.attempts == 0) {
        // Logical Button
        this.verificationCodeForm!.disable();
        this.verificationCodeForm!.reset();
        this.statusButtonVerificationCode = false;
        this.redirect();
        this.alert = {
          type: 'error',
          message: `El código de confirmación es incorrecto, vuelve a generar un código temporal`,
        };
      } else {
        this.alert = {
          type: 'error',
          message: `El código de confirmación es incorrecto, ${this.attempts} intentos restantes.`,
        };
      }
    } else {
      // Logical Button
      this.verificationCodeForm!.disable();
      this.verificationCodeForm!.reset();
      this.statusButtonVerificationCode = false;
      this.redirect();
      this.alert = {
        type: 'error',
        message: '¡Token expirado!',
      };
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
