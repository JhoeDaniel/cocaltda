import { Injectable } from '@angular/core';
import { compact, fromPairs } from 'lodash-es';
import { AngelApiHandler } from './api.request-handler';
import { AngelApiMethods } from './api.types';

@Injectable({
  providedIn: 'root',
})
export class AngelApiService {
  private _handlers: { [key: string]: Map<string, AngelApiHandler> } = {
    get: new Map<string, AngelApiHandler>(),
    post: new Map<string, AngelApiHandler>(),
    patch: new Map<string, AngelApiHandler>(),
    delete: new Map<string, AngelApiHandler>(),
    put: new Map<string, AngelApiHandler>(),
    head: new Map<string, AngelApiHandler>(),
    jsonp: new Map<string, AngelApiHandler>(),
    options: new Map<string, AngelApiHandler>(),
  };

  /**
   * Constructor
   */
  constructor() {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Find the handler from the service
   * with the given method and url
   *
   * @param method
   * @param url
   */
  findHandler(
    method: string,
    url: string
  ): {
    handler: AngelApiHandler | undefined;
    urlParams: { [key: string]: string };
  } {
    // Prepare the return object
    const matchingHandler: {
      handler: AngelApiHandler | undefined;
      urlParams: { [key: string]: string };
    } = {
      handler: undefined,
      urlParams: {},
    };

    // Split the url
    const urlParts = url.split('/');

    // Get all related request handlers
    const handlers = this._handlers[method.toLowerCase()];

    // Iterate through the handlers
    handlers.forEach((handler, handlerUrl) => {
      // Skip if there is already a matching handler
      if (matchingHandler.handler) {
        return;
      }

      // Split the handler url
      const handlerUrlParts = handlerUrl.split('/');

      // Skip if the lengths of the urls we are comparing are not the same
      if (urlParts.length !== handlerUrlParts.length) {
        return;
      }

      // Compare
      const matches = handlerUrlParts.every(
        (handlerUrlPart, index) =>
          handlerUrlPart === urlParts[index] || handlerUrlPart.startsWith(':')
      );

      // If there is a match...
      if (matches) {
        // Assign the matching handler
        matchingHandler.handler = handler;

        // Extract and assign the parameters
        matchingHandler.urlParams = fromPairs(
          compact(
            handlerUrlParts.map((handlerUrlPart, index) =>
              handlerUrlPart.startsWith(':')
                ? [handlerUrlPart.substring(1), urlParts[index]]
                : undefined
            )
          )
        );
      }
    });

    return matchingHandler;
  }

  /**
   * Register GET request handler
   *
   * @param url - URL address of the API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onGet(url: string, delay?: number): AngelApiHandler {
    return this._registerHandler('get', url, delay);
  }

  /**
   * Register POST request handler
   *
   * @param url - URL address of the API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onPost(url: string, delay?: number): AngelApiHandler {
    return this._registerHandler('post', url, delay);
  }

  /**
   * Register PATCH request handler
   *
   * @param url - URL address of the API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onPatch(url: string, delay?: number): AngelApiHandler {
    return this._registerHandler('patch', url, delay);
  }

  /**
   * Register DELETE request handler
   *
   * @param url - URL address of the API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onDelete(url: string, delay?: number): AngelApiHandler {
    return this._registerHandler('delete', url, delay);
  }

  /**
   * Register PUT request handler
   *
   * @param url - URL address of the API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onPut(url: string, delay?: number): AngelApiHandler {
    return this._registerHandler('put', url, delay);
  }

  /**
   * Register HEAD request handler
   *
   * @param url - URL address of the API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onHead(url: string, delay?: number): AngelApiHandler {
    return this._registerHandler('head', url, delay);
  }

  /**
   * Register JSONP request handler
   *
   * @param url - URL address of the API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onJsonp(url: string, delay?: number): AngelApiHandler {
    return this._registerHandler('jsonp', url, delay);
  }

  /**
   * Register OPTIONS request handler
   *
   * @param url - URL address of the API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onOptions(url: string, delay?: number): AngelApiHandler {
    return this._registerHandler('options', url, delay);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register and return a new instance of the handler
   *
   * @param method
   * @param url
   * @param delay
   * @private
   */
  private _registerHandler(
    method: AngelApiMethods,
    url: string,
    delay?: number
  ): AngelApiHandler {
    // Create a new instance of AngelApiRequestHandler
    const angelHttp = new AngelApiHandler(url, delay);

    // Store the handler to access it from the interceptor
    this._handlers[method].set(url, angelHttp);

    // Return the instance
    return angelHttp;
  }
}
