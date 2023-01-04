import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ModalVirtualBankingService } from '../modal-virtual-banking/modal-virtual-banking.service';

@Component({
  selector: 'app-container-virtual-banking',
  templateUrl: './container-virtual-banking.component.html',
})
export class ContainerVirtualBankingComponent implements OnDestroy {
  destroy = new Subject<any>();
  currentDialog: any;

  constructor(
    private _modalVirtualBankingService: ModalVirtualBankingService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    route: ActivatedRoute
  ) {
    route.params.pipe(takeUntil(this.destroy)).subscribe((params) => {
      this.currentDialog = this._modalVirtualBankingService
        .openModalVirtualBanking()
        .afterClosed()
        .subscribe(() => {
          let route = this._activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          this._router.navigate(['../'], { relativeTo: route });
        });
    });
  }

  ngOnDestroy() {
    this.destroy.next(0);
  }
}
