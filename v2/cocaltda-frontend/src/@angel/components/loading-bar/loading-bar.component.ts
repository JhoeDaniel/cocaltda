import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AngelLoadingService } from '../../services/loading';

@Component({
  selector: 'angel-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'angelLoadingBar',
})
export class AngelLoadingBarComponent implements OnChanges, OnInit, OnDestroy {
  @Input() autoMode: boolean = true;
  mode!: 'determinate' | 'indeterminate';
  progress: number = 0;
  show: boolean = false;

  showtTimeOut: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(private _angelLoadingService: AngelLoadingService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Auto mode
    if ('autoMode' in changes) {
      // Set the auto mode in the service
      this._angelLoadingService.setAutoMode(
        coerceBooleanProperty(changes.autoMode.currentValue)
      );
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the service
    this._angelLoadingService.mode$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.mode = value;
      });

    this._angelLoadingService.progress$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.progress = value!;
      });

    this._angelLoadingService.show$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.showtTimeOut = setTimeout(() => {
          this.show = value;
        });
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    clearTimeout(this.showtTimeOut);
  }
}
