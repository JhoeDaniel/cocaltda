import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { SessionService } from '../session.service';
import { Session } from '../session.types';
import { ModalSelectSessionService } from './modal-select-session.service';

@Component({
  selector: 'app-modal-select-session',
  templateUrl: './modal-select-session.component.html',
})
export class ModalSelectSessionComponent implements OnInit {
  id_session: string = '';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  listSession: Session[] = [];
  selectSessionForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _formBuilder: FormBuilder,
    private _sessionService: SessionService,
    private _modalSelectSessionService: ModalSelectSessionService
  ) {}

  ngOnInit(): void {
    /**
     * get the list of session
     */
    this._sessionService
      .queryRead('*')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_sessions: Session[]) => {
        this.listSession = _sessions;
      });
    /**
     * form
     */
    this.selectSessionForm = this._formBuilder.group({
      id_session: ['', [Validators.required]],
    });
  }
  /**
   * patchForm
   */
  patchForm(): void {
    this.selectSessionForm.patchValue({
      id_session: this.selectSessionForm.getRawValue().id_session,
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
    this.id_session = this.selectSessionForm.getRawValue().id_session;
    this.patchForm();
  }
  /**
   * closeModalSelectSession
   */
  closeModalSelectSession(): void {
    this._modalSelectSessionService.closeModalSelectSession();
  }
}
