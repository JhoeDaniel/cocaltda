import { angelAnimations } from '@angel/animations';
import { AngelAlertType } from '@angel/components/alert';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppData, appData } from 'app/core/app/app.data';
import { MessageAPI } from 'app/core/app/app.type';
import { AuthService } from 'app/core/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: angelAnimations,
})
export class AuthSignUpComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  _app_data: AppData = appData;

  alert: { type: AngelAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  signUpForm!: FormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signUpForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      company: [''],
      agreements: ['', Validators.requiredTrue],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign up
   */
  signUp(): void {
    // Do nothing if the form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    // Disable the form
    this.signUpForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign up
    this._authService
      .signUp(this.signUpForm.value)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: () => {
          // Navigate to the confirmation required page
          this._router.navigateByUrl('/confirmation-required');
        },
        error: (error: { error: MessageAPI }) => {
          // Re-enable the form
          this.signUpForm.enable();

          // Reset the form
          this.signUpForm.reset();

          // Set the alert
          this.alert = {
            type: 'error',
            message: !error.error
              ? '¡Error interno!, consulte al administrador.'
              : !error.error.description
              ? '¡Error interno!, consulte al administrador.'
              : error.error.description,
          };

          // Show the alert
          this.showAlert = true;
        },
      });
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(0);
    this._unsubscribeAll.complete();
  }
}
