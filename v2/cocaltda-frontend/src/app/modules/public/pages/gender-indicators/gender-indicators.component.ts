import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-gender-indicators',
  templateUrl: './gender-indicators.component.html',
  styleUrls: ['./gender-indicators.component.scss'],
})
export class GenderIndicatorsComponent implements OnInit {
  _urlPathResource: string = environment.urlBackend + '/resource/';

  constructor() {}

  ngOnInit() {}
}
