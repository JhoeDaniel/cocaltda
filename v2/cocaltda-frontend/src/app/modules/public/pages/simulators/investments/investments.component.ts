import { angelAnimations } from '@angel/animations';
import { AngelAlertType } from '@angel/components/alert';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { _page } from 'app/modules/public/public.data';
import { PublicService } from 'app/modules/public/public.service';
import {
  InvestmentsForm,
  InvestmentsParameters,
  InvestmentsTerm,
} from 'app/modules/public/public.type';
import { NotificationService } from 'app/shared/notification/notification.service';
import { Subject, takeUntil } from 'rxjs';
import { ModalSendInformationService } from '../modal-send-information/modal-send-information.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss'],
  animations: angelAnimations,
})
export class InvestmentsComponent implements OnInit {
  investmentsTerm: InvestmentsTerm[] = _page.investmentsTerm;
  minCapital: number = _page.minCapitalInvestments;
  maxCapital: number = _page.maxCapitalInvestments;
  daysOfTheYear: number = _page.daysOfTheYear;
  investmentsParameters: InvestmentsParameters[] = _page.investmentsParameters;
  showGains: boolean = false;
  textGains: string = '';

  subject: string = 'Inversión';

  idTimer: any = null;
  statusBtnGains: boolean = false;
  statusModal: boolean = false;
  timeToShowModal: number = 3000;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Alert
   */
  alert: { type: AngelAlertType; message: string } = {
    type: 'error',
    message: '',
  };
  showAlert: boolean = false;

  sendForm: boolean = false;
  investmentsForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    private _modalSendInformationService: ModalSendInformationService,
    private _publicService: PublicService
  ) {}

  ngOnInit() {
    /**
     *  getPageData
     */
    this._publicService.pageDate$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_page: any) => {
        this.investmentsTerm = _page.body.investmentsTerm;
        this.minCapital = _page.body.minCapitalInvestments;
        this.maxCapital = _page.body.maxCapitalInvestments;
        this.daysOfTheYear = _page.body.daysOfTheYear;
        this.investmentsParameters = _page.body.investmentsParameters;
        this.timeToShowModal = _page.body.timeToShowModalSimulators;
      });

    /**
     * Create the company form
     */
    this.investmentsForm = this._formBuilder.group({
      term: ['', [Validators.required]],
      capital: ['', [Validators.required]],
    });
  }

  /**
   * simulate
   * @returns
   */
  simulate(): void {
    this.sendForm = true;
    /**
     * Validate the informations
     */
    if (!this.investmentsForm.invalid) {
      /**
       * Get the variables
       */
      const investments: InvestmentsForm = this.investmentsForm.getRawValue();
      const term: InvestmentsTerm = investments.term;
      const capital: number = investments.capital;
      /**
       * Select the InvestmentsParameters according to your capital
       */
      const _investmentsParametersSelected: InvestmentsParameters | any =
        this.investmentsParameters.find(
          (_investmentsParameters: InvestmentsParameters) =>
            capital >= _investmentsParameters.from &&
            capital <= _investmentsParameters.to
        )!;

      if (_investmentsParametersSelected) {
        if (term.keyDay in _investmentsParametersSelected) {
          /**
           * Get the interest according to your capital and term
           */
          const interest: number = _investmentsParametersSelected[term.keyDay];
          /**
           * Calculate the gains
           */
          const gains: number =
            (capital * term.valueOfDays * (interest / 100)) /
            this.daysOfTheYear;

          this.textGains = `<p>Si inviertes <strong>${capital}</strong> dólares a <strong>${
            term.name
          }</strong> de plazo obtendrás <strong>${gains.toFixed(
            2
          )}</strong> dólares al haber transcurrido el tiempo.\nTasa de interés: <strong>${interest}%</strong></p>`;
          this.showGains = true;
          /**
           * Set timer for the modalSendInformation
           */
          this.idTimer = setTimeout(() => {
            /**
             * openModal
             */
            if (!this.statusModal && this.sendForm) {
              this.openModal();
            }
            /**
             * Show btn close gains
             */
            this.statusBtnGains = true;
          }, this.timeToShowModal);
        } else {
          this._notificationService.error(
            'Hay una incoherencia en la configuración de los plazos y sus parámetros'
          );
          return;
        }
      } else {
        this._notificationService.error(
          'No se encontró un parámetro de inversión de acuerdo al capital seleccionado'
        );
        return;
      }
    }
  }
  /**
   * openModal
   */
  openModal() {
    this.statusModal = true;
    /**
     * openModalSendInformation
     */
    this._modalSendInformationService
      .openModalSendInformation(this.subject, this.textGains)
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.statusModal = false;
      });
  }
  /**
   * reset
   */
  reset(): void {
    /**
     * Re-enable the form
     */
    this.investmentsForm.enable();
    /**
     * Reset the form
     */
    this.investmentsForm.reset();
    /**
     * Reset sendForm
     */
    this.sendForm = false;
    /**
     * Reset the gains
     */
    this.showGains = false;
    /**
     * Reset the status btn gains
     */
    this.statusBtnGains = false;
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    /**
     * Unsubscribe from all subscriptions
     */
    this._unsubscribeAll.next(0);
    this._unsubscribeAll.complete();
    /**
     * Clear timers
     */
    clearTimeout(this.idTimer);
  }
}
