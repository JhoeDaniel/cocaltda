import { angelAnimations } from '@angel/animations';
import { AngelAlertType } from '@angel/components/alert';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageAPI } from 'app/core/app/app.type';
import { NotificationService } from 'app/shared/notification/notification.service';
import { environment } from 'environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: angelAnimations,
  providers: [AuthService, ContactService],
})
export class ContactComponent implements OnInit {
  nameUserMailer: string = environment.nameUserMailer;
  passwordUserMailer: string = environment.passwordUserMailer;
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
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _contactService: ContactService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit() {
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
      subject: ['', [Validators.required, Validators.maxLength(50)]],
      message: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  formSend(): void {
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
                let indicatorSubject: string = 'Contacto ';

                contact = {
                  ...contact,
                  name: contact.name.toUpperCase(),
                  email: contact.email.toLowerCase(),
                  subject: indicatorSubject + contact.subject,
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
}
