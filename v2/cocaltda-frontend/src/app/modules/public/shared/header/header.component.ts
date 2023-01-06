import { AngelMediaWatcherService } from '@angel/services/media-watcher';
import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PublicService } from '../../public.service';
import { HeaderItem } from '../../public.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerItems: HeaderItem[] = [];
  itemSelected!: HeaderItem;
  panelOpenState: boolean = false;
  activated: boolean = false;
  statusMenu: boolean = false;

  router: string = '/public/index';

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  isScreenSmall: boolean = false;

  constructor(
    private _angelMediaWatcherService: AngelMediaWatcherService,
    private _publicService: PublicService
  ) {}

  ngOnInit() {
    /**
     *  getPageData
     */
    this._publicService.pageDate$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_page: any) => {
        this.headerItems = _page.body.headerItems;
      });
    // Subscribe to media changes
    this._angelMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
        /**
         * Desactive status menu
         */
        if (!this.isScreenSmall) {
          if (this.activated) {
            this.activated = false;
          }
        }
      });

    this.mutateHeaderItems(this.headerItems);
  }

  setItem(_itemSelected: HeaderItem) {
    if (this.itemSelected) {
      if (_itemSelected.id != this.itemSelected.id) {
        this.statusMenu = false;
      }
    }
    this.itemSelected = _itemSelected;
    this.statusMenu = !this.statusMenu;
  }

  setRouter(link: string): void {
    this.router = link;
    this.mutateHeaderItems(this.headerItems);
  }

  mutateHeaderItems(headerItems: HeaderItem[]): void {
    let newArray: HeaderItem[] = [];
    /**
     * First level
     */
    if (headerItems) {
      headerItems.map((item: HeaderItem) => {
        if (this.router === item.link) {
          item = {
            ...item,
            actived: true,
          };
        }
        /**
         * Second level
         */
        if (item.hasChildren && item.children!.length > 0) {
          let newArrayChildrenSecondLevel: HeaderItem[] = [];

          item.children?.map((itemChildren: any) => {
            if (this.router === itemChildren.link) {
              itemChildren = {
                ...itemChildren,
                actived: true,
              };
            }
            newArrayChildrenSecondLevel.push(itemChildren);
          });
          /**
           * Remplazamos el segundo nivel de hijos
           */
          item.children = newArrayChildrenSecondLevel;
        }
        newArray.push(item);
      });
      this.headerItems = newArray;
    }
  }
  /**
   * openSideBar
   */
  openSideBar() {
    this.activated = !this.activated;
    this.statusMenu = false;
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
