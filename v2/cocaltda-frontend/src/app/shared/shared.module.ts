import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ModalViewSchemaComponent } from './modal-view-schema/modal-view-schema.component';
import { PreviewPdfComponent } from './preview-pdf/preview-pdf.component';
import { PreviewReportComponent } from './preview-report/preview-report.component';
@NgModule({
  declarations: [
    ModalViewSchemaComponent,
    PreviewReportComponent,
    PreviewPdfComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    NgxExtendedPdfViewerModule,
    PdfViewerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
