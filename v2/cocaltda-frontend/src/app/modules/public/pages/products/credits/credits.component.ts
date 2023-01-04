import { Component, OnInit } from '@angular/core';
import { _page } from 'app/modules/public/public.data';
import { PublicService } from 'app/modules/public/public.service';
import { ItemToggle, Page } from 'app/modules/public/public.type';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
})
export class CreditsComponent implements OnInit {
  _page: Page = _page;

  itemToggleCredits: ItemToggle[] = _page.itemToggleCredits;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Inicializing the selected item
   */
  idItemsGallery: number = 0;
  selectedItem: ItemToggle = this.itemToggleCredits[0];

  constructor(private _publicService: PublicService) {}

  ngOnInit() {
    /**
     * idItemsGallery
     */
    this._publicService.idItemsGallery$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_idItemsGallery: number) => {
        this.idItemsGallery = _idItemsGallery;

        let anyItem: ItemToggle = this.itemToggleCredits.find(
          (itemToggle) => itemToggle.id === this.idItemsGallery
        )!;

        if (!anyItem) {
          this.selectItem(this.itemToggleCredits[0]);
        } else {
          /**
           * Inicializing the selected item
           */
          if (this.idItemsGallery) {
            this.setSelectItem();
          } else {
            this.selectItem(this.itemToggleCredits[0]);
          }
        }
      });
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    /**
     * Unsubscribe from all subscriptions
     */
    this._unsubscribeAll.next(0);
    this._unsubscribeAll.complete();
  }

  setSelectItem() {
    let item = this.itemToggleCredits.find(
      (item) => item.id === this.idItemsGallery
    );

    if (item) {
      this.selectItem(item);
    }
  }

  resetSelectItem() {
    this.selectItem(this.itemToggleCredits[0]);
  }

  selectItem(item: ItemToggle): void {
    /**
     * Sett the item
     */
    this.selectedItem = item;
    /**
     * Mutate the selected
     */

    let newItem = {
      ...item,
      selected: true,
    };

    /**
     * Get the index
     */
    let index = this.itemToggleCredits.indexOf(item);
    /**
     * Restar att selected
     */
    this.restartSelected();
    /**
     * Replace the item in the array
     */
    this.itemToggleCredits.splice(index, 1, newItem);
  }

  restartSelected(): void {
    this.itemToggleCredits = this.itemToggleCredits.map((item) => {
      return {
        ...item,
        selected: false,
      };
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
}
