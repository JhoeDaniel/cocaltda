import { AngelNavigationItem } from '@angel/components/navigation';
import { Injectable } from '@angular/core';
import { Navigation } from 'app/core/app/app.type';
import { FullDate } from './utils.types';

@Injectable({
  providedIn: 'root',
})
export class GlobalUtils {
  constructor() {}
  /**
   *
   * @param _object of the state with properties disorganized
   * @returns array
   */
  parseObjectToArray(_object: any) {
    const array = [];

    for (let x = 0; x < Object.keys(_object).length; x++) {
      if (_object[x] != undefined) {
        array.push(_object[x]);
      }
    }

    return array;
  }
  /**
   * Function to generate route for the user to navigate
   * @param navigations Item of navigación sourcing of store
   * @returns path to user navigated
   */
  generateRoutes(navigations: Navigation) {
    let allNavigations = [];
    let _routes: string[] = [];

    // Parse Navigation to Array
    const _default = this.parseObjectToArray(navigations.defaultNavigation);
    const _compact = this.parseObjectToArray(navigations.compactNavigation);
    const _futuristic = this.parseObjectToArray(
      navigations.futuristicNavigation
    );
    const _horizontal = this.parseObjectToArray(
      navigations.futuristicNavigation
    );

    allNavigations = Array.prototype.concat(
      _default,
      _compact,
      _futuristic,
      _horizontal
    );

    allNavigations.map((item: AngelNavigationItem) => {
      if (item.link) {
        _routes.push(item.link);
      }
      /**
       * 1 Level
       */
      if (item.children) {
        item.children.map((item: AngelNavigationItem) => {
          if (item.link) {
            _routes.push(item.link);
          }
          /**
           * 2 Level
           */
          if (item.children) {
            item.children.map((item: AngelNavigationItem) => {
              if (item.link) {
                _routes.push(item.link);
              }
              /**
               * 3 Level
               */
              if (item.children) {
                item.children.map((item: AngelNavigationItem) => {
                  if (item.link) {
                    _routes.push(item.link);
                  }
                  /**
                   * 4 Level
                   */
                  if (item.children) {
                    item.children.map((item: AngelNavigationItem) => {
                      if (item.link) {
                        _routes.push(item.link);
                      }
                      /**
                       * 5 Level
                       */
                      if (item.children) {
                        item.children.map((item: AngelNavigationItem) => {
                          if (item.link) {
                            _routes.push(item.link);
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
    return this.removeDuplicates(_routes);
  }
  /**
   * removeDuplicates
   * @param ArrayRoutes
   * @returns
   */
  removeDuplicates(ArrayRoutes: string[]) {
    const _arrayRoutes = ArrayRoutes.concat();
    for (var i = 0; i < _arrayRoutes.length; ++i) {
      for (var j = i + 1; j < _arrayRoutes.length; ++j) {
        if (_arrayRoutes[i] === _arrayRoutes[j]) {
          _arrayRoutes.splice(j, 1);
        }
      }
    }
    return _arrayRoutes;
  }
  /**
   * parseDateToString
   * @param fecha
   * @returns
   */
  parseDateToString(fecha: Date): string {
    const date = new Date(fecha);
    return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }/${date.getFullYear()}`;
  }
  /**
   * blobToBase64
   * @param blob
   * @returns
   */
  blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const base64 = dataUrl.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  }
  /**
   * blobToJSON
   * @param blob
   * @returns
   */
  blobToJSON(blob: Blob): Promise<any> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      try {
        fileReader.onload = (event: any) => {
          const json = JSON.parse(event.target.result);
          resolve(json);
        };

        fileReader.readAsText(blob);
      } catch (error: any) {
        reject(error.toString());
      }
    });
  }
  /**
   * arrayBufferToJSON
   * @param arrayBuffer
   * @returns
   */
  arrayBufferToJSON(arrayBuffer: ArrayBuffer): Promise<object> {
    return new Promise((resolve, reject) => {
      const asciiArray: number[] = Array.from(new Uint8Array(arrayBuffer));
      try {
        const jsonString = this.asciiToString(asciiArray);
        resolve(JSON.parse(jsonString));
      } catch (error: any) {
        reject(error.toString());
      }
    });
  }
  /**
   * asciiToString
   * Función para transformar un Función con códigos Ascii a su correspondiente string
   * @param arrayAscii
   * @returns
   */
  asciiToString = (arrayAscii: number[]): string => {
    let stringXml: string = '';
    arrayAscii.forEach((code: number) => {
      let character = String.fromCharCode(code);
      stringXml += character;
    });
    return stringXml;
  };
  /**
   * Return { day, month, fullYear, hours, minutes, seconds, milliSeconds }
   */
  getFullDate = (stringDate: string): FullDate => {
    var date: Date = new Date(stringDate);
    return {
      fullYear: date.getFullYear(),
      month: this.addCeroNumber(date.getMonth() + 1),
      day: this.addCeroNumber(date.getDate()),
      hours: this.addCeroNumber(date.getHours()),
      minutes: this.addCeroNumber(date.getMinutes()),
      seconds: this.addCeroNumber(date.getSeconds()),
      milliSeconds: date.getMilliseconds(),
    };
  };
  /**
   * addCeroNumber
   * @param number
   * @returns string
   */
  addCeroNumber = (number: number): string => {
    return number <= 9 ? `0${number}` : `${number}`;
  };
}
