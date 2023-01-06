import { AngelMediaWatcherService } from '@angel/services/media-watcher';
import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PublicService } from '../../public.service';
import { CarouselItem } from '../../public.type';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  /**
   * Custom Properties
   */
  @Input() height = 450;
  @Input() msToChange = 10000;
  @Input() isFullScreen = false;
  @Input() items: CarouselItem[] = [];

  timer!: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  isScreenSmall: boolean = false;

  /**
   * Final Properties
   */
  public finalHeight: string | number = 0;
  public currentPosition = 0;

  constructor(
    private _angelMediaWatcherService: AngelMediaWatcherService,
    private _publicService: PublicService
  ) {
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
  }

  ngOnInit() {
    /**
     *  getPageData
     */
    this._publicService.pageDate$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_page: any) => {
        this.msToChange = _page.body.msToChangeCarousel;
      });

    if (this.items) {
      this.items.map((i, index) => {
        i.id = index;
        i.marginLeft = 0;
      });
    }

    // Subscribe to media changes
    this._angelMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('sm');
      });
    /**
     * Set interval to change
     */
    this.timer = setInterval(() => {
      if (this.currentPosition <= this.items.length) {
        this.setNext();
      }
    }, this.msToChange);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  setCurrentPosition(position: number) {
    this.currentPosition = position;
    this.items.find((i) => i.id === 0)!.marginLeft = -100 * position;
  }

  setNext() {
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;
    if (nextPosition <= this.items.length - 1) {
      finalPercentage = -100 * nextPosition;
    } else {
      nextPosition = 0;
    }
    this.items.find((i) => i.id === 0)!.marginLeft = finalPercentage;
    this.currentPosition = nextPosition;
  }

  setBack() {
    let finalPercentage = 0;
    let backPosition = this.currentPosition - 1;
    if (backPosition >= 0) {
      finalPercentage = -100 * backPosition;
    } else {
      backPosition = this.items.length - 1;
      finalPercentage = -100 * backPosition;
    }
    this.items.find((i) => i.id === 0)!.marginLeft = finalPercentage;
    this.currentPosition = backPosition;
  }
}
