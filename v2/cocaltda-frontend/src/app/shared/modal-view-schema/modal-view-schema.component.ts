import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalViewSchemaService } from './modal-view-schema.service';

@Component({
  selector: 'app-modal-view-schema',
  templateUrl: './modal-view-schema.component.html',
})
export class ModalViewSchemaComponent implements OnInit {
  schema: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _modalViewSchemaService: ModalViewSchemaService
  ) {}

  ngOnInit(): void {
    this.schema = this._data.schema;
  }
  /**
   * close
   */
  close(): void {
    this._modalViewSchemaService.closeModalViewSchemaService();
  }
  /**
   * parseJsonToText
   * @returns
   */
  parseJsonToText(json: any) {
    return JSON.stringify(json, null, 2);
  }
}
