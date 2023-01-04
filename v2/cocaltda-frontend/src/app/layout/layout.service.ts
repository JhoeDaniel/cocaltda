import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  /**
   * Observable para detectar si se tiene o no el QuickChat en cada layout
   */
  _havedQuickChat: boolean = false;

  private havedQuickChat: BehaviorSubject<boolean> = new BehaviorSubject(
    this._havedQuickChat
  );

  get havedQuickChat$(): Observable<boolean> {
    return this.havedQuickChat.asObservable();
  }

  /**
   * Observable para detectar si hay modales abiertos
   */
  _isOpenModal: boolean = false;

  private isOpenModal: BehaviorSubject<boolean> = new BehaviorSubject(
    this._isOpenModal
  );

  get isOpenModal$(): Observable<boolean> {
    return this.isOpenModal.asObservable();
  }

  constructor() {}

  setQuickChat(status: boolean): void {
    this.havedQuickChat.next(status);
  }

  setOpenModal(status: boolean): void {
    this.isOpenModal.next(status);
  }
}
