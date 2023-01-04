import { Component, Input, OnInit } from '@angular/core';
import { _page } from '../../public.data';
import { PublicService } from '../../public.service';
import { Page } from '../../public.type';

@Component({
  selector: 'app-items-gallery',
  templateUrl: './items-gallery.component.html',
  styleUrls: ['./items-gallery.component.scss'],
})
export class ItemsGalleryComponent implements OnInit {
  page: Page = _page;

  @Input() title = 'Gallery Name';
  @Input() itemsGallery = this.page.itemGalleryProducts;

  constructor(private _publicService: PublicService) {}

  ngOnInit() {}

  setItemGallery(id: number) {
    this._publicService.$idItemsGallery = id;
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
