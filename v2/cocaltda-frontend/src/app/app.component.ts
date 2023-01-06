import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SessionService } from './modules/core/session/session.service';
import { PublicService } from './modules/public/public.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  /**
   * Constructor
   */
  constructor(
    private _sessionService: SessionService,
    private _publicService: PublicService
  ) {
    this._sessionService.registerCulture('es-EC');
  }

  ngOnChanges(): void {}

  ngOnInit() {
    /**
     *  getPageData
     */
    this._publicService
      .getPageData()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe();
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    /**
     * Unsubscribe from all subscriptions
     */
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
