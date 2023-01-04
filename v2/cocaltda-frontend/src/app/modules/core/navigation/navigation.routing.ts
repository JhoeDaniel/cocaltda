import { Route } from '@angular/router';
import { NavigationDetailsComponent } from './details/details.component';
import { NavigationListComponent } from './list/list.component';
import { NavigationComponent } from './navigation.component';
import { CanDeactivateNavigationDetails } from './navigation.guards';
import { NavigationResolver } from './navigation.resolvers';

export const navigationRoutes: Route[] = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        component: NavigationListComponent,
        children: [
          {
            path: ':id_navigation',
            component: NavigationDetailsComponent,
            resolve: {
              task: NavigationResolver,
            },
            canDeactivate: [CanDeactivateNavigationDetails],
          },
        ],
      },
    ],
  },
];
