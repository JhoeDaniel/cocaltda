import { angelAnimations } from '@angel/animations';
import { AngelAlertType } from '@angel/components/alert';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageAPI } from 'app/core/app/app.type';
import { AuthService } from 'app/modules/public/auth/auth.service';
import { NotificationService } from 'app/shared/notification/notification.service';
import { environment } from 'environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { ContactService } from '../../contact/contact.service';
import { ModalSendInformationService } from './modal-send-information.service';

@Component({
  selector: 'app-modal-send-information',
  templateUrl: './modal-send-information.component.html',
  styleUrls: ['./modal-send-information.component.scss'],
  providers: [AuthService, ContactService],
  animations: angelAnimations,
})
export class ModalSendInformationComponent implements OnInit {
  nameUserMailer: string = environment.nameUserMailer;
  passwordUserMailer: string = environment.passwordUserMailer;

  textGains: string = '';
  subject: string = '';
  /**
   * Alert
   */
  alert: { type: AngelAlertType; message: string } = {
    type: 'error',
    message: '',
  };
  showAlert: boolean = false;

  contactForm!: FormGroup;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _formBuilder: FormBuilder,
    private _modalSendInformationService: ModalSendInformationService,
    private _authService: AuthService,
    private _contactService: ContactService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.textGains = this._data.textGains;
    this.subject = this._data.subject;
    /**
     * Create the company form
     */
    this.contactForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(256)],
      ],
      phone: ['', [Validators.required, Validators.maxLength(13)]],
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
   * sendInformation
   */
  sendInformation(): void {
    /**
     * Validar la información
     */
    if (this.contactForm.invalid) {
      this.showAlert = true;
    } else {
      /**
       * SignIn Public Auth
       */
      this._authService
        .signIn(this.nameUserMailer, this.passwordUserMailer)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe({
          next: (messageAPI: MessageAPI) => {
            if (messageAPI.id === true) {
              if (messageAPI.body) {
                let token = messageAPI.body;
                let contact = this.contactForm.getRawValue();

                contact = {
                  ...contact,
                  name: contact.name.toUpperCase(),
                  email: contact.email.toLowerCase(),
                  subject: this.subject,
                  message: this.textGains,
                };

                this._contactService
                  .formSend(contact, token)
                  .pipe(takeUntil(this._unsubscribeAll))
                  .subscribe({
                    next: (messageAPI: MessageAPI) => {
                      if (messageAPI.id === true) {
                        this._notificationService.success(
                          'Información enviada correctamente'
                        );
                        /**
                         * Re-enable the form
                         */
                        this.contactForm.enable();
                        /**
                         * Reset the form
                         */
                        this.contactForm.reset();
                        /**
                         * Show the alert
                         */
                        this.showAlert = false;
                        /**
                         * Close the modal
                         */
                        this._modalSendInformationService.closeModalSendInformation();
                      }
                    },
                    error: (error: { error: MessageAPI }) => {
                      /**
                       * Set the alert
                       */
                      this.alert = {
                        type: 'error',
                        message: !error.error
                          ? '¡Error interno!, consulte al administrador.'
                          : !error.error.description
                          ? '¡Error interno!, consulte al administrador.'
                          : error.error.description,
                      };
                      /**
                       * Show the alert
                       */
                      this.showAlert = true;
                    },
                  });
              } else {
                this.alert = {
                  type: 'error',
                  message: '¡Error interno!, consulte al administrador.',
                };
                /**
                 * Show the alert
                 */
                this.showAlert = true;
              }
            } else {
              this.alert = {
                type: 'error',
                message: '¡Error interno!, consulte al administrador.',
              };
              /**
               * Show the alert
               */
              this.showAlert = true;
            }
          },
          error: (error: { error: MessageAPI }) => {
            /**
             * Set the alert
             */
            this.alert = {
              type: 'error',
              message: !error.error
                ? '¡Error interno!, consulte al administrador.'
                : !error.error.description
                ? '¡Error interno!, consulte al administrador.'
                : error.error.description,
            };
            /**
             * Show the alert
             */
            this.showAlert = true;
          },
        });
    }
  }
  /**
   * closeModalSendInformation
   */
  closeModalSendInformation(): void {
    this._modalSendInformationService.closeModalSendInformation();
  }
}
