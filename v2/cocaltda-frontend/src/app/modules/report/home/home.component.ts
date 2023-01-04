import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppInitialData, MessageAPI } from 'app/core/app/app.type';
import { LayoutService } from 'app/layout/layout.service';
import { UserService } from 'app/modules/core/user/user.service';
import { NotificationService } from 'app/shared/notification/notification.service';
import { PreviewPdfService } from 'app/shared/preview-pdf/preview-pdf.service';
import { PreviewReportComponent } from 'app/shared/preview-report/preview-report.component';
import { GlobalUtils } from 'app/utils/GlobalUtils';
import { Subject, takeUntil } from 'rxjs';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  pdfSource: string = '';
  private data!: AppInitialData;

  constructor(
    private _store: Store<{ global: AppInitialData }>,
    private _globalUtils: GlobalUtils,
    private _matDialog: MatDialog,
    private _reportService: ReportService,
    private _notificationService: NotificationService,
    private _userService: UserService,
    private _layoutService: LayoutService,
    private _previewPdfService: PreviewPdfService
  ) {}

  ngOnInit(): void {
    /**
     * Subscribe to user changes of state
     */
    this._store.pipe(takeUntil(this._unsubscribeAll)).subscribe((state) => {
      this.data = state.global;
    });
  }
  /**
   * reportUser
   */
  reportUser() {
    const id_user_: string = this.data.user.id_user;

    this._userService
      .reportUser()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: async (response: any) => {
          let name_report: string = response.headers.get('name_report');
          if (name_report) {
            this.pdfSource = await this._globalUtils.blobToBase64(
              response.body
            );
            let _dialogRef = this._matDialog.open(PreviewReportComponent, {
              height: ' 90vh',
              width: '90vw',
              data: {
                source: this.pdfSource,
                nameFile: name_report,
              },
            });
            /**
             * subscribe to afterClosed
             */
            _dialogRef.afterClosed().subscribe(() => {
              this._reportService
                .deleteReport(id_user_, name_report)
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe();
            });
          } else {
            let message: MessageAPI = JSON.parse(
              response.headers.get('message')
            );
            if (message.code == '06-010') {
              this._notificationService.error(
                !message.description
                  ? '¡Error interno!, consulte al administrador.'
                  : message.description
              );
            }
          }
        },
        error: (error: any) => {
          const errorBlob: Blob = error.error;
          this._globalUtils
            .blobToJSON(errorBlob)
            .then((errorJSON: MessageAPI) => {
              this._notificationService.error(
                !errorJSON
                  ? '¡Error interno!, consulte al administrador.'
                  : errorJSON.description
              );
            })
            .catch((error: string) => {
              this._notificationService.error(
                !error ? '¡Error interno!, consulte al administrador.' : error
              );
            });
        },
      });
  }
  /**
   * preview
   */
  preview(): void {
    const name_report: string = 'reportUser623804183';

    this._reportService
      .downloadReport(name_report)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (arrayBuffer: ArrayBuffer) => {
          this._previewPdfService
            .openPreviewPdf(arrayBuffer)
            .afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
              this._layoutService.setOpenModal(false);
            });
        },
        error: (error: any) => {
          const errorArrayBuffer: any = error.error;
          this._globalUtils
            .arrayBufferToJSON(errorArrayBuffer)
            .then((errorJSON: any) => {
              this._notificationService.error(
                !errorJSON
                  ? '¡Error interno!, consulte al administrador.'
                  : errorJSON.description
              );
            })
            .catch((error: string) => {
              this._notificationService.error(
                !error ? '¡Error interno!, consulte al administrador.' : error
              );
            });
        },
      });
  }
}
