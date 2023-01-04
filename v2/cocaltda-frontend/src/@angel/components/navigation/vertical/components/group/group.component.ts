import { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AngelNavigationService } from '../../../../../components/navigation/navigation.service';
import { AngelNavigationItem } from '../../../../../components/navigation/navigation.types';
import { AngelVerticalNavigationComponent } from '../../../../../components/navigation/vertical/vertical.component';

@Component({
  selector: 'angel-vertical-navigation-group-item',
  templateUrl: './group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngelVerticalNavigationGroupItemComponent
  implements OnInit, OnDestroy
{
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_autoCollapse: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */

  @Input() autoCollapse!: boolean;
  @Input() item!: AngelNavigationItem;
  @Input() name!: string;

  private _angelVerticalNavigationComponent!: AngelVerticalNavigationComponent;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _angelNavigationService: AngelNavigationService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the parent navigation component
    this._angelVerticalNavigationComponent =
      this._angelNavigationService.getComponent(this.name);

    // Subscribe to onRefreshed on the navigation component
    this._angelVerticalNavigationComponent.onRefreshed
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

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
