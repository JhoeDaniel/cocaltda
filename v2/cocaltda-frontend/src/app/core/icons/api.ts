import { AngelApiService } from '@angel/api';
import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { feather, heroicons, iconsmind, material } from './data';

@Injectable({
  providedIn: 'root',
})
export class IconsApi {
  private readonly _feather: any = feather;
  private readonly _heroicons: any = heroicons;
  private readonly _iconsmind: any = iconsmind;
  private readonly _material: any = material;

  /**
   * Constructor
   */
  constructor(private _angelApiService: AngelApiService) {
    // Register API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ Feather icons - GET
    // -----------------------------------------------------------------------------------------------------
    this._angelApiService.onGet('api/ui/icons/feather').reply(() => [
      200,
      {
        namespace: 'feather',
        name: 'Feather',
        grid: 'icon-size-6',
        list: cloneDeep(this._feather),
      },
    ]);

    // -----------------------------------------------------------------------------------------------------
    // @ Heroicons outline icons - GET
    // -----------------------------------------------------------------------------------------------------
    this._angelApiService.onGet('api/ui/icons/heroicons-outline').reply(() => [
      200,
      {
        namespace: 'heroicons_outline',
        name: 'Heroicons Outline',
        grid: 'icon-size-6',
        list: cloneDeep(this._heroicons),
      },
    ]);

    // -----------------------------------------------------------------------------------------------------
    // @ Heroicons solid icons - GET
    // -----------------------------------------------------------------------------------------------------
    this._angelApiService.onGet('api/ui/icons/heroicons-solid').reply(() => [
      200,
      {
        namespace: 'heroicons_solid',
        name: 'Heroicons Solid',
        grid: 'icon-size-5',
        list: cloneDeep(this._heroicons),
      },
    ]);

    // -----------------------------------------------------------------------------------------------------
    // @ Iconsmind icons - GET
    // -----------------------------------------------------------------------------------------------------
    this._angelApiService.onGet('api/ui/icons/iconsmind').reply(() => [
      200,
      {
        namespace: 'iconsmind',
        name: 'Iconsmind',
        grid: 'icon-size-10',
        list: cloneDeep(this._iconsmind),
      },
    ]);

    // -----------------------------------------------------------------------------------------------------
    // @ Material solid icons - GET
    // -----------------------------------------------------------------------------------------------------
    this._angelApiService.onGet('api/ui/icons/material-solid').reply(() => [
      200,
      {
        namespace: 'mat_solid',
        name: 'Material Solid',
        grid: 'icon-size-6',
        list: cloneDeep(this._material),
      },
    ]);

    // -----------------------------------------------------------------------------------------------------
    // @ Material outline icons - GET
    // -----------------------------------------------------------------------------------------------------
    this._angelApiService.onGet('api/ui/icons/material-outline').reply(() => [
      200,
      {
        namespace: 'mat_outline',
        name: 'Material Outline',
        grid: 'icon-size-6',
        list: cloneDeep(this._material),
      },
    ]);

    // -----------------------------------------------------------------------------------------------------
    // @ Material twotone icons - GET
    // -----------------------------------------------------------------------------------------------------
    this._angelApiService.onGet('api/ui/icons/material-twotone').reply(() => [
      200,
      {
        namespace: '',
        name: 'Material Twotone',
        grid: 'icon-size-6',
        list: cloneDeep(this._material),
      },
    ]);
  }
}
