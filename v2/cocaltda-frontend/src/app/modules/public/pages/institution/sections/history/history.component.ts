import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  @Input() title = 'Institución';

  constructor() {}

  ngOnInit() {}
}
