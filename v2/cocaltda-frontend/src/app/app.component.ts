import { Component } from '@angular/core';
import { SessionService } from './modules/core/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Constructor
   */
  constructor(private _sessionService: SessionService) {
    this._sessionService.registerCulture('es-EC');
  }
}
