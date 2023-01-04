import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { timeWaitingNotification } from 'app/core/app/app.config';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  timeWaiting: number = timeWaitingNotification;

  constructor(
    private readonly _snackBar: MatSnackBar,
    private readonly _zone: NgZone
  ) {}

  /** Default notifications */

  info(message: string, time: number = this.timeWaiting) {
    this.show(message, {
      duration: time,
      panelClass: ['notification-overlay', 'notification-info'],
    });
  }

  success(message: string, time: number = this.timeWaiting) {
    this.show(message, {
      duration: time,
      panelClass: ['notification-overlay', 'notification-success'],
    });
  }

  warn(message: string, time: number = this.timeWaiting) {
    this.show(message, {
      duration: time,
      panelClass: ['notification-overlay', 'notification-warn'],
    });
  }

  error(message: string, time: number = this.timeWaiting) {
    this.show(message, {
      duration: time,
      panelClass: ['notification-overlay', 'notification-error'],
    });
  }

  /** Notifications with confirm */

  private show(message: string, configuration: MatSnackBarConfig) {
    this._zone.run(() =>
      this._snackBar.open(message, undefined, configuration)
    );
  }

  dismiss() {
    this._snackBar.dismiss();
  }
}
