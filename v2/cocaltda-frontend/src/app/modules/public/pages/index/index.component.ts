import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { _page } from '../../public.data';
import { PublicService } from '../../public.service';
import { Page } from '../../public.type';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  page: Page = _page;

  constructor(private _publicService: PublicService) {}

  ngOnInit() {
    /**
     *  getPageData
     */
    this._publicService.pageDate$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_page: any) => {
        this.page = _page.body;
      });
  }
  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
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
