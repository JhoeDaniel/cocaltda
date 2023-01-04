import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { SystemEventService } from '../system-event.service';
import { SystemEvent } from '../system-event.types';
import { ModalSelectSystemEventService } from './modal-select-system-event.service';

@Component({
  selector: 'app-modal-select-system-event',
  templateUrl: './modal-select-system-event.component.html',
})
export class ModalSelectSystemEventComponent implements OnInit {
  id_system_event: string = '';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  listSystemEvent: SystemEvent[] = [];
  selectSystemEventForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _formBuilder: FormBuilder,
    private _systemEventService: SystemEventService,
    private _modalSelectSystemEventService: ModalSelectSystemEventService
  ) {}

  ngOnInit(): void {
    /**
     * get the list of systemEvent
     */
    this._systemEventService
      .queryRead('*')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_systemEvents: SystemEvent[]) => {
        this.listSystemEvent = _systemEvents;
      });
    /**
     * form
     */
    this.selectSystemEventForm = this._formBuilder.group({
      id_system_event: ['', [Validators.required]],
    });
  }
  /**
   * patchForm
   */
  patchForm(): void {
    this.selectSystemEventForm.patchValue({
      id_system_event: this.selectSystemEventForm.getRawValue().id_system_event,
    });
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
  }
  /**
   * changeSelect
   */
  changeSelect(): void {
    this.id_system_event =
      this.selectSystemEventForm.getRawValue().id_system_event;
    this.patchForm();
  }
  /**
   * closeModalSelectSystemEvent
   */
  closeModalSelectSystemEvent(): void {
    this._modalSelectSystemEventService.closeModalSelectSystemEvent();
  }
}
