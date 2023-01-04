import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-black-friday',
  templateUrl: './black-friday.component.html',
  styleUrls: ['./black-friday.component.scss'],
})
export class BlackFridayComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  goToAdmin() {
    this._router.navigateByUrl('/business');
  }
}
