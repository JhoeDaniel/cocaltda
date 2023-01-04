import { Component, OnInit } from '@angular/core';
import { ModalVirtualBankingService } from '../virtual-banking/modal-virtual-banking/modal-virtual-banking.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
})
export class TransfersComponent implements OnInit {
  constructor(
    private _modalVirtualBankingService: ModalVirtualBankingService
  ) {}

  ngOnInit() {}

  /**
   * openModalVirtualBanking
   */
  openModalVirtualBanking() {
    this._modalVirtualBankingService.openModalVirtualBanking();
  }
}
