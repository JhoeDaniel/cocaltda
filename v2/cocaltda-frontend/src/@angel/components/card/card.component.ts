import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { angelAnimations } from '../../animations';
import { AngelCardFace } from '../../components/card/card.types';

@Component({
  selector: 'angel-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: angelAnimations,
  exportAs: 'angelCard',
})
export class AngelCardComponent implements OnChanges {
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_expanded: BooleanInput;
  static ngAcceptInputType_flippable: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */

  @Input() expanded: boolean = false;
  @Input() face: AngelCardFace = 'front';
  @Input() flippable: boolean = false;

  /**
   * Constructor
   */
  constructor() {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Host binding for component classes
   */
  @HostBinding('class') get classList(): any {
    return {
      'angel-card-expanded': this.expanded,
      'angel-card-face-back': this.flippable && this.face === 'back',
      'angel-card-face-front': this.flippable && this.face === 'front',
      'angel-card-flippable': this.flippable,
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
    // Expanded
    if ('expanded' in changes) {
      // Coerce the value to a boolean
      this.expanded = coerceBooleanProperty(changes.expanded.currentValue);
    }

    // Flippable
    if ('flippable' in changes) {
      // Coerce the value to a boolean
      this.flippable = coerceBooleanProperty(changes.flippable.currentValue);
    }
  }
}
