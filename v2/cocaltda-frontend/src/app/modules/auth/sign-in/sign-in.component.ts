import { angelAnimations } from '@angel/animations';
import { AngelAlertType } from '@angel/components/alert';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppData, appData } from 'app/core/app/app.data';
import { AppInitialData, MessageAPI } from 'app/core/app/app.type';
import { AuthService } from 'app/core/auth/auth.service';
import { resetInactive } from 'app/store/global/global.actions';
import { SecurityCap } from 'app/utils/SecurityCap';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: angelAnimations,
})
export class AuthSignInComponent implements OnInit {
  _app_data: AppData = appData;

  alert: { type: AngelAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  signInForm!: FormGroup;
  showAlert: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _store: Store<{ global: AppInitialData }>,
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
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [''],
    });

    // Subscribe to user changes of state
    this._store.pipe(takeUntil(this._unsubscribeAll)).subscribe((state) => {
      if (state.global.rememberMe.enabled) {
        this.signInForm.patchValue({
          rememberMe: state.global.rememberMe.enabled,
          email: state.global.rememberMe.user,
          password: this._securityCap.aesDecrypt(
            state.global.rememberMe.password
          ),
        });
      }
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */
  signIn(): void {
    // Return if the form is invalid
    if (this.signInForm!.invalid) {
      return;
    }

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign in
    this._authService
      .signIn(this.signInForm.value)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: () => {
          const redirectURL =
            this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
            '/signed-in-redirect';
          // Navigate to the redirect url
          this._router.navigateByUrl(redirectURL);
          // Set the inactive to false
          this._store.dispatch(resetInactive());
        },
        error: (error: { error: MessageAPI }) => {
          // Re-enable the form
          this.signInForm.enable();

          // Reset the form
          this.signInForm.reset();
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
}
