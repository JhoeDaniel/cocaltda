import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent implements OnInit {
  @Input() title = 'Title';
  @Input() icon = 'heroicons_outline:shield-check';
  @Input() visibleImage = true;
  @Input() image = 'assets/images/static/contactMobile.jpg';

  constructor() {}

  ngOnInit() {}
}
