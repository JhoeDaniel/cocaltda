import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { _page } from '../../public.data';
import { CarouselItem, ItemGallery, Page } from '../../public.type';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  page: Page = _page;

  public carouselData: CarouselItem[] = this.page.carouselItems;
  itemsGalleryProducts: ItemGallery[] = this.page.itemGalleryProducts;
  itemsGalleryServices: ItemGallery[] = this.page.itemGalleryServices;

  constructor() {}

  ngOnInit() {}
  /**
   * On destroy
   */
  ngOnDestroy(): void {}
}
