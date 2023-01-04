import { angelAnimations } from '@angel/animations';
import { AngelAlertType } from '@angel/components/alert';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  _amortizationTable,
  _creditsTerm,
  _daysOfTheYear,
  _minBalanceCredit,
  _typeCreditProduct,
} from 'app/modules/public/public.data';
import {
  AmortizationTable,
  CreditsForm,
  CreditsTerm,
  FrenchDividend,
  GermanDividend,
  TypeCreditProduct,
} from 'app/modules/public/public.type';
import { GlobalUtils } from 'app/utils/GlobalUtils';
import { FullDate } from 'app/utils/utils.types';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
  animations: angelAnimations,
})
export class CreditsComponent implements OnInit {
  typeCreditProduct: TypeCreditProduct[] = _typeCreditProduct;
  creditsTerm: CreditsTerm[] = _creditsTerm;
  amortizationTable: AmortizationTable[] = _amortizationTable;

  minBalance = _minBalanceCredit;
  maxBalance: number = 0;
  typeCreditProductSelect: TypeCreditProduct = _typeCreditProduct[0];

  bodyTable: string = '';
  showBodyTable: boolean = false;

  arrayPaymentDate: FullDate[] = [];
  /**
   * Alert
   */
  alert: { type: AngelAlertType; message: string } = {
    type: 'error',
    message: '',
  };
  showAlert: boolean = false;

  sendForm: boolean = false;
  creditsForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _globalUtils: GlobalUtils
  ) {}

  ngOnInit() {
    this.subtractDate(new Date(), new Date());

    /**
     * Create the company form
     */
    this.creditsForm = this._formBuilder.group({
      type: ['', [Validators.required]],
      balance: ['', [Validators.required]],
      term: ['', [Validators.required]],
      amortizationTable: ['', [Validators.required]],
      paymentDay: ['', [Validators.required]],
    });
  }
  /**
   * updateMaxBalance
   */
  updateMaxBalance() {
    const credits: CreditsForm = this.creditsForm.getRawValue();
    this.typeCreditProductSelect = credits.type;
    this.maxBalance = this.typeCreditProductSelect.maxAmount;
  }
  /**
   * updateMaxTerm
   */
  updateMaxTerm() {
    const credits: CreditsForm = this.creditsForm.getRawValue();

    if (credits.term.valueOfMonts > this.typeCreditProductSelect.maxTerm) {
      this.showAlert = true;
    } else {
      this.showAlert = false;
    }
  }
  /**
   * simulate
   */
  simulate(): void {
    this.sendForm = true;
    this.bodyTable = '';
    this.arrayPaymentDate = [];
    /**
     * Validate the informations
     */
    if (this.creditsForm.invalid) {
      this.showAlert = true;
    } else {
      /**
       * Get the variables
       */
      const credits: CreditsForm = this.creditsForm.getRawValue();

      const type: TypeCreditProduct = credits.type;
      let balance: number = credits.balance;
      const term: CreditsTerm = credits.term;
      const amortizationTable: AmortizationTable = credits.amortizationTable;
      const paymentDay: number = credits.paymentDay;

      if (amortizationTable.amortizationTable === 'German') {
        /**
         * German
         */
        var nowDate = new Date();
        let nowFullDate: FullDate = this._globalUtils.getFullDate(
          nowDate.toString()
        );
        /**
         * Get the array payment date
         */
        this.arrayPaymentDate = this.getArrayPaymentDate(
          nowFullDate,
          paymentDay,
          term.valueOfMonts
        );

        let _germanDividend: GermanDividend[] = [];
        /**
         * get the values to assemble the german dividend
         */
        let capital = balance / term.valueOfMonts;
        let paymentDate: Date;
        let calculateDays: number;
        let interest: number;
        let cuota: number;

        for (let index = 0; index < term.valueOfMonts; index++) {
          /**
           * paymentDate
           */
          paymentDate = new Date(
            `${this.arrayPaymentDate[index].fullYear}-${this.arrayPaymentDate[index].month}-${this.arrayPaymentDate[index].day}T00:00:00`
          );
          /**
           * balance
           */
          if (index != 0) {
            balance -= capital;
          }
          /**
           * calculateDays
           */
          calculateDays =
            index === 0
              ? this.subtractDate(
                  new Date(
                    `${nowFullDate.fullYear}-${nowFullDate.month}-${nowFullDate.day}T00:00:00`
                  ),
                  new Date(
                    `${this.arrayPaymentDate[index].fullYear}-${this.arrayPaymentDate[index].month}-${this.arrayPaymentDate[index].day}T00:00:00`
                  )
                )
              : this.subtractDate(
                  new Date(
                    `${this.arrayPaymentDate[index - 1].fullYear}-${
                      this.arrayPaymentDate[index - 1].month
                    }-${this.arrayPaymentDate[index - 1].day}T00:00:00`
                  ),
                  new Date(
                    `${this.arrayPaymentDate[index].fullYear}-${this.arrayPaymentDate[index].month}-${this.arrayPaymentDate[index].day}T00:00:00`
                  )
                );
          /**
           * interest
           */
          interest =
            (balance * calculateDays * (type.interest / 100)) / _daysOfTheYear;
          /**
           * cuota
           */
          cuota = capital + interest;
          /**
           * Assemble the german dividend
           */
          _germanDividend.push({
            id: index,
            paymentDate,
            capital,
            calculateDays,
            balance,
            interest,
            cuota,
          });
          /**
           * Transfor the Date to Full Date Object
           */
          let paymentDateFullDate = this._globalUtils.getFullDate(
            _germanDividend[index].paymentDate!.toString()
          );

          let _paymentDate = `${paymentDateFullDate.day}/${paymentDateFullDate.month}/${paymentDateFullDate.fullYear}`;
          /**
           * Assembled the row dividend
           */
          this.bodyTable =
            this.bodyTable +
            `<tr>
          <td class="p-2">${_germanDividend[index].id + 1}</td>
          <td class="p-2">${_paymentDate}</td>
          <td class="p-2">${_germanDividend[index].capital!.toFixed(2)}</td>
          <td class="p-2">${_germanDividend[index].calculateDays}</td>
          <td class="p-2">${_germanDividend[index].balance!.toFixed(2)}</td>
          <td class="p-2">${_germanDividend[index].interest!.toFixed(2)}</td>
          <td class="p-2">${_germanDividend[index].cuota!.toFixed(
            2
          )}</td></tr>`;
        }
        /**
         * Put the header table
         */
        this.bodyTable = `<table class="w-full p-4 text-base font-normal text-gray-500 border-2 border-solid border-gray-300">
              <tr>
                <td class="p-2 text-green-600 font-bold">Dividendo</td>
                <td class="p-2 text-green-600 font-bold">Fecha Pago</td>
                <td class="p-2 text-green-600 font-bold">Capital</td>
                <td class="p-2 text-green-600 font-bold">Días</td>
                <td class="p-2 text-green-600 font-bold">Saldo</td>
                <td class="p-2 text-green-600 font-bold">Interés</td>
                <td class="p-2 text-green-600 font-bold">Cuota</td>
              </tr>
              ${this.bodyTable}
              </table>
              `;
        /**
         * Show the table
         */
        this.showBodyTable = true;
      } else {
        /**
         * French
         */
        var nowDate = new Date();
        let nowFullDate: FullDate = this._globalUtils.getFullDate(
          nowDate.toString()
        );
        /**
         * Get the array payment date
         */
        this.arrayPaymentDate = this.getArrayPaymentDate(
          nowFullDate,
          paymentDay,
          term.valueOfMonts
        );

        let _frenchDividend: FrenchDividend[] = [];
        /**
         * get the values to assemble the german dividend
         */
        let paymentDate: Date;
        /**
         * cuota
         */
        let cuota: number =
          balance *
          (type.interest /
            100 /
            (1 - Math.pow(1 + type.interest / 100, -term.valueOfMonts)));

        /**
         * interest
         */
        let interest: number = balance * (type.interest / 100);
        let capital = balance / term.valueOfMonts;

        for (let index = 0; index < term.valueOfMonts; index++) {
          /**
           * paymentDate
           */
          paymentDate = new Date(
            `${this.arrayPaymentDate[index].fullYear}-${this.arrayPaymentDate[index].month}-${this.arrayPaymentDate[index].day}T00:00:00`
          );
          /**
           * balance
           */
          if (index != 0) {
            balance -= capital;
          }
          /**
           * interest
           */
          if (index != 0) {
            interest = balance * (type.interest / 100);
          }

          /**
           * capital
           */
          capital = cuota - interest;

          /**
           * Assemble the german dividend
           */
          _frenchDividend.push({
            id: index,
            paymentDate,
            cuota,
            interest,
            capital,
            balance,
          });
          /**
           * Transfor the Date to Full Date Object
           */
          let paymentDateFullDate = this._globalUtils.getFullDate(
            _frenchDividend[index].paymentDate!.toString()
          );

          let _paymentDate = `${paymentDateFullDate.day}/${paymentDateFullDate.month}/${paymentDateFullDate.fullYear}`;
          /**
           * Assembled the row dividend
           */
          this.bodyTable =
            this.bodyTable +
            `<tr>
           <td class="p-2">${_frenchDividend[index].id + 1}</td>
           <td class="p-2">${_paymentDate}</td>
           <td class="p-2">${_frenchDividend[index].cuota.toFixed(2)}</td>
           <td class="p-2">${_frenchDividend[index].interest.toFixed(2)}</td>
           <td class="p-2">${_frenchDividend[index].capital.toFixed(2)}</td>
           <td class="p-2">${_frenchDividend[index].balance.toFixed(
             2
           )}</td></tr>`;
        }
        /**
         * Put the header table
         */
        this.bodyTable = `<table class="w-full p-4 text-base font-normal text-gray-500 border-2 border-solid border-gray-300">
               <tr>
                 <td class="p-2 text-green-600 font-bold">Dividendo</td>
                 <td class="p-2 text-green-600 font-bold">Fecha Pago</td>
                 <td class="p-2 text-green-600 font-bold">Cuota</td>
                 <td class="p-2 text-green-600 font-bold">Interés</td>
                 <td class="p-2 text-green-600 font-bold">Capital</td>
                 <td class="p-2 text-green-600 font-bold">Saldo</td>
               </tr>
               ${this.bodyTable}
               </table>
               `;
        /**
         * Show the table
         */
        this.showBodyTable = true;
      }
    }
  }
  /**
   * subtractDate
   * @param firstDate
   * @param secondDate
   * @returns days
   */
  subtractDate(startDate: Date, endDate: Date) {
    const diffInMilliseconds = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInMilliseconds / 86400000;
    return diffInDays;
  }
  /**
   * getArrayPaymentDate
   * @param nowFullDate
   * @param paymentDay
   * @param valueOfMonts
   */
  getArrayPaymentDate(
    nowFullDate: FullDate,
    paymentDay: number,
    valueOfMonts: number
  ): FullDate[] {
    let arrayPaymentDate: FullDate[] = [];

    let date = new Date(
      `${nowFullDate.fullYear}-${
        nowFullDate.month
      }-${this._globalUtils.addCeroNumber(paymentDay)}T00:00:00`
    );

    let increment: number = date.getMonth() + 1;

    for (let index = 1; index <= valueOfMonts; index++) {
      date.setMonth(increment);

      if (index % 12 === 0) {
        increment = 0;
      }

      let _fullDate: FullDate = this._globalUtils.getFullDate(date.toString());
      arrayPaymentDate.push(_fullDate);
      increment += 1;
    }

    return arrayPaymentDate;
  }
}
