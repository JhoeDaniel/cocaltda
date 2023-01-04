import { angelAnimations } from '@angel/animations';
import { Component, ViewEncapsulation } from '@angular/core';
import { AppData, appData } from 'app/core/app/app.data';

@Component({
  selector: 'auth-confirmation-required',
  templateUrl: './confirmation-required.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: angelAnimations,
})
export class AuthConfirmationRequiredComponent {
  /**
   * Constructor
   */
  _app_data: AppData = appData;

  constructor() {}
}
