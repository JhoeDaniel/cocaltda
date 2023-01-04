import { Route } from '@angular/router';
import { SystemEventDetailsComponent } from './details/details.component';
import { SystemEventListComponent } from './list/list.component';
import { SystemEventComponent } from './system-event.component';
import { CanDeactivateSystemEventDetails } from './system-event.guards';
import { SystemEventResolver } from './system-event.resolvers';

export const systemEventRoutes: Route[] = [
  {
    path: '',
    component: SystemEventComponent,
    children: [
      {
        path: '',
        component: SystemEventListComponent,
        children: [
          {
            path: ':id_system_event',
            component: SystemEventDetailsComponent,
            resolve: {
              task: SystemEventResolver,
            },
            canDeactivate: [CanDeactivateSystemEventDetails],
          },
        ],
      },
    ],
  },
];
