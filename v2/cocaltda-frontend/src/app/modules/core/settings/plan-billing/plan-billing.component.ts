import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'settings-plan-billing',
  templateUrl: './plan-billing.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPlanBillingComponent implements OnInit {
  planBillingForm!: FormGroup;
  plans!: any[];

  /**
   * Constructor
   */
  constructor(private _formBuilder: FormBuilder) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.planBillingForm = this._formBuilder.group({
      plan: ['team'],
      cardHolder: ['Angel Loor'],
      cardNumber: [''],
      cardExpiration: [''],
      cardCVC: [''],
      country: ['usa'],
      zip: [''],
    });

    // Setup the plans
    this.plans = [
      {
        value: 'basic',
        label: 'BASICO',
        details: 'Plan de inicio para particulares.',
        price: '10',
      },
      {
        value: 'team',
        label: 'MEDIO',
        details: 'Colabora hasta 10 personas.',
        price: '20',
      },
      {
        value: 'enterprise',
        label: 'EMPRESA',
        details: 'Para empresas más grandes.',
        price: '40',
      },
    ];
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
