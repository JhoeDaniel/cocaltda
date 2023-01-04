import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { systemEvent, systemEvents } from './system-event.data';
import { SystemEvent } from './system-event.types';

@Injectable({
  providedIn: 'root',
})
export class SystemEventService {
  private _url: string;
  private _headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private _systemEvent: BehaviorSubject<SystemEvent> = new BehaviorSubject(
    systemEvent
  );
  private _systemEvents: BehaviorSubject<SystemEvent[]> = new BehaviorSubject(
    systemEvents
  );

  constructor(private _httpClient: HttpClient) {
    this._url = environment.urlBackend + '/app/core/system_event';
  }
  /**
   * Getter
   */
  get systemEvent$(): Observable<SystemEvent> {
    return this._systemEvent.asObservable();
  }
  /**
   * Getter for _systemEvents
   */
  get systemEvents$(): Observable<SystemEvent[]> {
    return this._systemEvents.asObservable();
  }
  /**
   * queryRead
   * @param query
   */
  queryRead(query: string): Observable<SystemEvent[]> {
    return this._httpClient
      .get<SystemEvent[]>(this._url + `/queryRead/${query ? query : '*'}`)
      .pipe(
        tap((systemEvents: SystemEvent[]) => {
          if (systemEvents) {
            this._systemEvents.next(systemEvents);
          } else {
            this._systemEvents.next([]);
          }
        })
      );
  }
  /**
   * byUserQueryRead
   * @param id_user
   * @param query
   */
  byUserQueryRead(id_user: string, query: string): Observable<SystemEvent[]> {
    return this._httpClient
      .get<SystemEvent[]>(
        this._url + `/byUserQueryRead/${id_user}/${query ? query : '*'}`
      )
      .pipe(
        tap((systemEvents: SystemEvent[]) => {
          if (systemEvents) {
            this._systemEvents.next(systemEvents);
          } else {
            this._systemEvents.next([]);
          }
        })
      );
  }
  /**
   * specificRead
   * @param id_systemEvent
   */
  specificRead(id_systemEvent: string): Observable<SystemEvent> {
    return this._httpClient
      .get<SystemEvent>(this._url + `/specificRead/${id_systemEvent}`)
      .pipe(
        tap((systemEvents: SystemEvent) => {
          this._systemEvent.next(systemEvent);
          return systemEvents;
        })
      );
  }
  /**
   * specificReadInLocal
   */
  specificReadInLocal(id_systemEvent: string): Observable<SystemEvent> {
    return this._systemEvents.pipe(
      take(1),
      map((systemEvents) => {
        /**
         * Find
         */
        const systemEvent =
          systemEvents.find((item) => item.id_system_event == id_systemEvent) ||
          null;
        /**
         * Update
         */
        this._systemEvent.next(systemEvent!);
        /**
         * Return
         */
        return systemEvent;
      }),
      switchMap((systemEvent) => {
        if (!systemEvent) {
          return throwError(
            () => 'No se encontro el elemento con el id ' + id_systemEvent + '!'
          );
        }
        return of(systemEvent);
      })
    );
  }
}
