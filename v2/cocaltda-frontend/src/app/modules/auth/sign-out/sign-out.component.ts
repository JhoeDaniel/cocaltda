import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppData, appData } from 'app/core/app/app.data';
import { AuthService } from 'app/core/auth/auth.service';
import { Subject, timer } from 'rxjs';
import { finalize, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'auth-sign-out',
  templateUrl: './sign-out.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AuthSignOutComponent implements OnInit, OnDestroy {
  countdown: number = 5;
  countdownMapping: any = {
    '=1': '# segundo',
    other: '# segundos',
  };

  _app_data: AppData = appData;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(private _authService: AuthService, private _router: Router) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Sign out
    this._authService.signOut().subscribe();
    // Redirect after the countdown
    timer(1000, 1000)
      .pipe(
        finalize(() => {
          this._router.navigate(['auth/sign-in']);
        }),
        takeWhile(() => this.countdown > 0),
        takeUntil(this._unsubscribeAll),
        tap(() => this.countdown--)
      )
      .subscribe();
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
