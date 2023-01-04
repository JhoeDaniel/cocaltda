import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppInitialData } from 'app/core/app/app.type';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-preview-report',
  templateUrl: './preview-report.component.html',
  styleUrls: ['./preview-report.component.scss'],
})
export class PreviewReportComponent implements OnInit {
  private data!: AppInitialData;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  pdfSource: string = '';
  theme: string = 'light';
  nameDownload: string = 'report';

  constructor(
    private _store: Store<{ global: AppInitialData }>,
    @Inject(MAT_DIALOG_DATA) public _data: any
  ) {}
  ngOnInit(): void {
    /**
     * Subscribe to user changes of state
     */
    this._store.pipe(takeUntil(this._unsubscribeAll)).subscribe((state) => {
      this.data = state.global;
      if (this.data.appConfig.scheme != 'auto') {
        this.theme = this.data.appConfig.scheme;
      }
    });

    this.pdfSource = this._data.source;
    this.nameDownload = this._data.nameFile;
  }
}
