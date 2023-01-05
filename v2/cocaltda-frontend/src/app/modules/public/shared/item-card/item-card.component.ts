import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() srcImage: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() titleBtn: string = '';
  @Input() matTooltipBtn: string = '';
  @Input() link: string = '';
  @Input() externalLink: boolean = false;
  @Input() target: string = '_self';
  @Input() position: string = 'Left';
  // Right
  constructor() {}

  ngOnInit() {}
}
