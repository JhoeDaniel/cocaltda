/**
 * Usage: dateString | localDate:'format'
 **/
import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { SessionService } from 'app/modules/core/session/session.service';

@Pipe({
  name: 'localDate',
})
export class LocalDatePipe implements PipeTransform {
  constructor(private _session: SessionService) {}

  transform(value: any, format: string) {
    if (!value) {
      return '';
    }
    if (!format) {
      format = 'shortDate';
    }

    return formatDate(value, format, this._session.locale);
  }
}
