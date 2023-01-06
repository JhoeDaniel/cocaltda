import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { _page } from './public.data';
import { Page } from './public.type';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private _url: string;
  private idItemsGallery: BehaviorSubject<number> = new BehaviorSubject(0);
  private pageDate: BehaviorSubject<Page> = new BehaviorSubject(_page);

  constructor(private _httpClient: HttpClient) {
    this._url = environment.urlBackend + '/app/public/index';
  }
  /**
   * Getter
   */
  get idItemsGallery$(): Observable<number> {
    return this.idItemsGallery.asObservable();
  }
  /**
   * Setter
   */
  set $idItemsGallery(_idItemsGallery: number) {
    this.idItemsGallery.next(_idItemsGallery);
  }
  /**
   * Getter
   */
  get pageDate$(): Observable<Page> {
    return this.pageDate.asObservable();
  }
  /**
   * Setter
   */
  set $pageDate(_page: Page) {
    this.pageDate.next(_page);
  }
  /**
   * getPageData
   */
  getPageData(): Observable<Page> {
    return this._httpClient.get<Page>(this._url + '/getPageData').pipe(
      tap((_page: Page) => {
        this.pageDate.next(_page);
      })
    );
  }
}
