import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AngelNavigationService } from '../../../../../components/navigation/navigation.service';
import { AngelNavigationItem } from '../../../../../components/navigation/navigation.types';
import { AngelVerticalNavigationComponent } from '../../../../../components/navigation/vertical/vertical.component';
import { AngelUtilsService } from '../../../../../services/utils/utils.service';

@Component({
  selector: 'angel-vertical-navigation-basic-item',
  templateUrl: './basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngelVerticalNavigationBasicItemComponent
  implements OnInit, OnDestroy
{
  @Input() item!: AngelNavigationItem;
  @Input() name!: string;

  isActiveMatchOptions: IsActiveMatchOptions;
  private _angelVerticalNavigationComponent!: AngelVerticalNavigationComponent;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _angelNavigationService: AngelNavigationService,
    private _angelUtilsService: AngelUtilsService
  ) {
    // Set the equivalent of {exact: false} as default for active match options.
    // We are not assigning the item.isActiveMatchOptions directly to the
    // [routerLinkActiveOptions] because if it's "undefined" initially, the router
    // will throw an error and stop working.
    this.isActiveMatchOptions = this._angelUtilsService.subsetMatchOptions;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Set the "isActiveMatchOptions" either from item's
    // "isActiveMatchOptions" or the equivalent form of
    // item's "exactMatch" option
    this.isActiveMatchOptions =
      this.item.isActiveMatchOptions ?? this.item.exactMatch
        ? this._angelUtilsService.exactMatchOptions
        : this._angelUtilsService.subsetMatchOptions;

    // Get the parent navigation component
    this._angelVerticalNavigationComponent =
      this._angelNavigationService.getComponent(this.name);

    // Mark for check
    this._changeDetectorRef.markForCheck();

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
}
