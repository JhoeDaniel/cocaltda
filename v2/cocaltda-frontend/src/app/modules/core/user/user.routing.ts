import { Route } from '@angular/router';
import { UserDetailsComponent } from './details/details.component';
import { UserListComponent } from './list/list.component';
import { UserComponent } from './user.component';
import { CanDeactivateUserDetails } from './user.guards';
import { UserResolver } from './user.resolvers';

export const userRoutes: Route[] = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
        children: [
          {
            path: ':id_user',
            component: UserDetailsComponent,
            resolve: {
              task: UserResolver,
            },
            canDeactivate: [CanDeactivateUserDetails],
          },
        ],
      },
    ],
  },
];
