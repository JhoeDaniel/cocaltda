import { angelAnimations } from '@angel/animations';
import { AngelAlertType } from '@angel/components/alert';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppData, appData } from 'app/core/app/app.data';
import { AppInitialData, MessageAPI } from 'app/core/app/app.type';
import { AuthService } from 'app/core/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'auth-unlock-session',
  templateUrl: './unlock-session.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: angelAnimations,
})
export class AuthUnlockSessionComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  _app_data: AppData = appData;

  alert: { type: AngelAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  name_person!: string;
  private name_user!: string;

  showAlert: boolean = false;
  unlockSessionForm!: FormGroup;
  /**
   * Constructor
   */
  constructor(
    private _store: Store<{ global: AppInitialData }>,
    private _activatedRoute: ActivatedRoute,
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
    /**
     * checkSession
     */
    this._authService
      .checkSession()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe();
    /**
     * checkSession
     */
    // Get the user's name
    this._store.pipe(takeUntil(this._unsubscribeAll)).subscribe((state) => {
      this.name_person =
        state.global.user.person.name_person +
        ' ' +
        state.global.user.person.last_name_person;
      this.name_user = state.global.user.name_user;
    });

    // Create the form
    this.unlockSessionForm = this._formBuilder.group({
      name_person: [
        {
          value: this.name_person,
          disabled: true,
        },
      ],
      password: ['', Validators.required],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Unlock
   */
  unlock(): void {
    // Return if the form is invalid
    if (this.unlockSessionForm.invalid) {
      return;
    }

    // Disable the form
    this.unlockSessionForm.disable();

    // Hide the alert
    this.showAlert = false;

    this._authService
      .unlockSession({
        name_user: this.name_user ?? '',
        password_user: this.unlockSessionForm.get('password')!.value,
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: () => {
          // Set the redirect url.
          // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
          // to the correct page after a successful sign in. This way, that url can be set via
          // routing file and we don't have to touch here.
          const redirectURL =
            this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
            '/signed-in-redirect';

          // Navigate to the redirect url
          this._router.navigateByUrl(redirectURL);
        },
        error: (error: { error: MessageAPI }) => {
          // Re-enable the form
          this.unlockSessionForm.enable();

          // Reset the form
          this.unlockSessionForm.reset();
          // Patch value
          this.unlockSessionForm.patchValue({
            name_person: this.name_person,
          });
          // Disabled control
          this.unlockSessionForm.get('name_person')!.disable();

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
