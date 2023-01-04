import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutService } from 'app/layout/layout.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'empty-layout',
  templateUrl: './empty.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EmptyLayoutComponent implements OnInit, OnDestroy {
  /**
   * Establecer en true si en el layout esta activado el chat
   */
  havedQuickChat: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(private _layoutService: LayoutService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    /**
     * Set the QuickChat
     */
    this._layoutService.setQuickChat(this.havedQuickChat);
    /**
     * Set the QuickChat
     */
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
