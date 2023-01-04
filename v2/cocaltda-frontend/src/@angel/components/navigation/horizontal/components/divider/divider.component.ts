import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AngelHorizontalNavigationComponent } from '../../../../../components/navigation/horizontal/horizontal.component';
import { AngelNavigationService } from '../../../../../components/navigation/navigation.service';
import { AngelNavigationItem } from '../../../../../components/navigation/navigation.types';

@Component({
  selector: 'angel-horizontal-navigation-divider-item',
  templateUrl: './divider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngelHorizontalNavigationDividerItemComponent
  implements OnInit, OnDestroy
{
  @Input() item!: AngelNavigationItem;
  @Input() name!: string;

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
}
