import { Component, OnInit } from '@angular/core';
import { _page } from '../../public.data';
import { CarouselItem, ItemCard, ItemGallery, Page } from '../../public.type';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  page: Page = _page;

  public carouselData: CarouselItem[] = this.page.carouselItems;
  itemsGalleryProducts: ItemGallery[] = this.page.itemGalleryProducts;
  itemsGalleryServices: ItemGallery[] = this.page.itemGalleryServices;
  itemsCard: ItemCard[] = this.page.itemCard;

  constructor() {}

  ngOnInit() {}
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
