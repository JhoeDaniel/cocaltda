/**
 * Usage: number | localNumber:'format'
 * If no format is provided 2 decimals will be used.
 **/
import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { SessionService } from 'app/modules/core/session/session.service';

@Pipe({
  name: 'localNumber',
})
export class LocalNumberPipe implements PipeTransform {
  constructor(private _session: SessionService) {}

  transform(value: any, format: string) {
    if (value == null) {
      return '';
    } // !value would also react to zeros.
    if (!format) {
      format = '.2-2';
    }

    return formatNumber(value, this._session.locale, format);
  }
}
