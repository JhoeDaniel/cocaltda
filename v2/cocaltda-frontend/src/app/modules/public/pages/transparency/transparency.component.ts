import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-transparency',
  templateUrl: './transparency.component.html',
  styleUrls: ['./transparency.component.scss'],
})
export class TransparencyComponent implements OnInit {
  _urlPathPdf: string = environment.urlBackend + '/resource/pdf/';
  constructor() {}

  ngOnInit() {}
}
