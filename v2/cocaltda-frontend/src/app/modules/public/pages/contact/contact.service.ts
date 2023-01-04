import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { Contact } from './contact.type';

@Injectable()
export class ContactService {
  private _url: string = '';
  private _headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private _httpClient: HttpClient) {
    this._url = environment.urlBackend + '/app/public/contact';
  }
  /**
   * formSend
   * @param contact
   * @param token
   */
  formSend(contact: Contact, token: string): Observable<any> {
    return this._httpClient
      .post(this._url + '/formSend', contact, { headers: this._headers })
      .pipe(
        switchMap((response) => {
          return of(response);
        })
      );
  }
}
