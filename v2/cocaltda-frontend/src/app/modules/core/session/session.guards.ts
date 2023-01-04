import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionDetailsComponent } from './details/details.component';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateSessionDetails
  implements CanDeactivate<SessionDetailsComponent>
{
  canDeactivate(
    component: SessionDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /**
     * Get the next route
     */
    let nextRoute: ActivatedRouteSnapshot = nextState.root;
    while (nextRoute.firstChild) {
      nextRoute = nextRoute.firstChild;
    }
    /**
     * If the next state doesn't contain '/session'
     * it means we are navigating away from the
     * session app
     */
    if (!nextState.url.includes('/session')) {
      /**
       * Let it navigate
       */
      return true;
    }
    /**
     * If we are navigating to another
     */
    if (nextRoute.paramMap.get('id_session')) {
      /**
       * Just navigate
       */
      return true;
    } else {
      /**
       * Close the drawer first, and then navigate
       */
      return component.closeDrawer().then(() => {
        return true;
      });
    }
  }
}
