import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private idItemsGallery: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {}
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
}
