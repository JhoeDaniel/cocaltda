import { Route } from '@angular/router';
import { SessionDetailsComponent } from './details/details.component';
import { SessionListComponent } from './list/list.component';
import { SessionComponent } from './session.component';
import { CanDeactivateSessionDetails } from './session.guards';
import { SessionResolver } from './session.resolvers';

export const sessionRoutes: Route[] = [
  {
    path: '',
    component: SessionComponent,
    children: [
      {
        path: '',
        component: SessionListComponent,
        children: [
          {
            path: ':id_session',
            component: SessionDetailsComponent,
            resolve: {
              task: SessionResolver,
            },
            canDeactivate: [CanDeactivateSessionDetails],
          },
        ],
      },
    ],
  },
];
