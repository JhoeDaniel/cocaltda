import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreviewPdfService } from './preview-pdf.service';

@Component({
  selector: 'app-preview-pdf',
  templateUrl: './preview-pdf.component.html',
  styleUrls: ['./preview-pdf.component.scss'],
})
export class PreviewPdfComponent implements OnInit {
  src!: ArrayBuffer | string | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _previewPdfService: PreviewPdfService
  ) {}

  ngOnInit(): void {
    this.src = this._data.src;
  }
  /**
   * closePreviewPdf
   */
  closePreviewPdf(): void {
    this._previewPdfService.closePreviewPdf();
  }
}
