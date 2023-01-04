import { Injectable } from '@angular/core';
import { AngelDrawerComponent } from './drawer.component';

@Injectable({
  providedIn: 'root',
})
export class AngelDrawerService {
  private _componentRegistry: Map<string, AngelDrawerComponent> = new Map<
    string,
    AngelDrawerComponent
  >();

  /**
   * Constructor
   */
  constructor() {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register drawer component
   *
   * @param name
   * @param component
   */
  registerComponent(name: string, component: AngelDrawerComponent): void {
    this._componentRegistry.set(name, component);
  }

  /**
   * Deregister drawer component
   *
   * @param name
   */
  deregisterComponent(name: string): void {
    this._componentRegistry.delete(name);
  }

  /**
   * Get drawer component from the registry
   *
   * @param name
   */
  getComponent(name: string): AngelDrawerComponent | undefined {
    return this._componentRegistry.get(name);
  }
}
