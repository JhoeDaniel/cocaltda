import { angelAnimations } from '@angel/animations';
import { Component, ViewEncapsulation } from '@angular/core';
import { AppData, appData } from 'app/core/app/app.data';

@Component({
  selector: 'auth-sign-up-message',
  templateUrl: './sign-up-message.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: angelAnimations,
})
export class SignUpMessageComponent {
  /**
   * Constructor
   */
  _app_data: AppData = appData;

  constructor() {}
}
