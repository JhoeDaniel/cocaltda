import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { angelAnimations } from '../../animations';
import { AngelUtilsService } from '../../services/utils/utils.service';
import { AngelAlertService } from './alert.service';
import { AngelAlertAppearance, AngelAlertType } from './alert.types';

@Component({
  selector: 'angel-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: angelAnimations,
  exportAs: 'angelAlert',
})
export class AngelAlertComponent implements OnChanges, OnInit, OnDestroy {
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_dismissible: BooleanInput;
  static ngAcceptInputType_dismissed: BooleanInput;
  static ngAcceptInputType_showIcon: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */

  @Input() appearance: AngelAlertAppearance = 'soft';
  @Input() dismissed: boolean = false;
  @Input() dismissible: boolean = false;
  @Input() name: string = this._angelUtilsService.randomId();
  @Input() showIcon: boolean = true;
  @Input() type: AngelAlertType = 'primary';
  @Output() readonly dismissedChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _angelAlertService: AngelAlertService,
    private _angelUtilsService: AngelUtilsService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Host binding for component classes
   */
  @HostBinding('class') get classList(): any {
    return {
      'angel-alert-appearance-border': this.appearance === 'border',
      'angel-alert-appearance-fill': this.appearance === 'fill',
      'angel-alert-appearance-outline': this.appearance === 'outline',
      'angel-alert-appearance-soft': this.appearance === 'soft',
      'angel-alert-dismissed': this.dismissed,
      'angel-alert-dismissible': this.dismissible,
      'angel-alert-show-icon': this.showIcon,
      'angel-alert-type-primary': this.type === 'primary',
      'angel-alert-type-accent': this.type === 'accent',
      'angel-alert-type-warn': this.type === 'warn',
      'angel-alert-type-basic': this.type === 'basic',
      'angel-alert-type-info': this.type === 'info',
      'angel-alert-type-success': this.type === 'success',
      'angel-alert-type-warning': this.type === 'warning',
      'angel-alert-type-error': this.type === 'error',
    };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Dismissed
    if ('dismissed' in changes) {
      // Coerce the value to a boolean
      this.dismissed = coerceBooleanProperty(changes.dismissed.currentValue);

      // Dismiss/show the alert
      this._toggleDismiss(this.dismissed);
    }

    // Dismissible
    if ('dismissible' in changes) {
      // Coerce the value to a boolean
      this.dismissible = coerceBooleanProperty(
        changes.dismissible.currentValue
      );
    }

    // Show icon
    if ('showIcon' in changes) {
      // Coerce the value to a boolean
      this.showIcon = coerceBooleanProperty(changes.showIcon.currentValue);
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the dismiss calls
    this._angelAlertService.onDismiss
      .pipe(
        filter((name) => this.name === name),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        // Dismiss the alert
        this.dismiss();
      });

    // Subscribe to the show calls
    this._angelAlertService.onShow
      .pipe(
        filter((name) => this.name === name),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        // Show the alert
        this.show();
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
   * Dismiss the alert
   */
  dismiss(): void {
    // Return if the alert is already dismissed
    if (this.dismissed) {
      return;
    }

    // Dismiss the alert
    this._toggleDismiss(true);
  }

  /**
   * Show the dismissed alert
   */
  show(): void {
    // Return if the alert is already showing
    if (!this.dismissed) {
      return;
    }

    // Show the alert
    this._toggleDismiss(false);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Dismiss/show the alert
   *
   * @param dismissed
   * @private
   */
  private _toggleDismiss(dismissed: boolean): void {
    // Return if the alert is not dismissible
    if (!this.dismissible) {
      return;
    }

    // Set the dismissed
    this.dismissed = dismissed;

    // Execute the observable
    this.dismissedChanged.next(this.dismissed);

    // Notify the change detector
    this._changeDetectorRef.markForCheck();
  }
}
