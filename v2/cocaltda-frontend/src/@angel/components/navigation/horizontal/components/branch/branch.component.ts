import { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Subject, takeUntil } from 'rxjs';
import { AngelHorizontalNavigationComponent } from '../../../../../components/navigation/horizontal/horizontal.component';
import { AngelNavigationService } from '../../../../../components/navigation/navigation.service';
import { AngelNavigationItem } from '../../../../../components/navigation/navigation.types';

@Component({
  selector: 'angel-horizontal-navigation-branch-item',
  templateUrl: './branch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngelHorizontalNavigationBranchItemComponent
  implements OnInit, OnDestroy
{
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_child: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */

  @Input() child: boolean = false;
  @Input() item!: AngelNavigationItem;
  @Input() name!: string;
  @ViewChild('matMenu', { static: true }) matMenu!: MatMenu;

  private _angelHorizontalNavigationComponent!: AngelHorizontalNavigationComponent;
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
    this._angelHorizontalNavigationComponent =
      this._angelNavigationService.getComponent(this.name);

    // Subscribe to onRefreshed on the navigation component
    this._angelHorizontalNavigationComponent.onRefreshed
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
   * Trigger the change detection
   */
  triggerChangeDetection(): void {
    // Mark for check
    this._changeDetectorRef.markForCheck();
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
