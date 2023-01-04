import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalVirtualBankingService } from './modal-virtual-banking.service';

@Component({
  selector: 'app-modal-virtual-banking',
  templateUrl: './modal-virtual-banking.component.html',
  styleUrls: ['./modal-virtual-banking.component.scss'],
})
export class ModalVirtualBankingComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _modalVirtualBankingService: ModalVirtualBankingService
  ) {}

  ngOnInit(): void {}
  /**
   * On destroy
   */
  ngOnDestroy(): void {}
  /**
   * closeModalVirtualBanking
   */
  closeModalVirtualBanking(): void {
    this._modalVirtualBankingService.closeModalVirtualBanking();
  }
}
