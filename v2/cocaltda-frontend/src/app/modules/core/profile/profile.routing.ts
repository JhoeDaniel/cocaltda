import { Route } from '@angular/router';
import { ProfileDetailsComponent } from './details/details.component';
import { ProfileListComponent } from './list/list.component';
import { ProfileComponent } from './profile.component';
import { CanDeactivateProfileDetails } from './profile.guards';
import { ProfileResolver } from './profile.resolvers';

export const profileRoutes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ProfileListComponent,
        children: [
          {
            path: ':id_profile',
            component: ProfileDetailsComponent,
            resolve: {
              task: ProfileResolver,
            },
            canDeactivate: [CanDeactivateProfileDetails],
          },
        ],
      },
    ],
  },
];
