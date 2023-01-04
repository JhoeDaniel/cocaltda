import { Route } from '@angular/router';
import { TypeUserDetailsComponent } from './details/details.component';
import { TypeUserListComponent } from './list/list.component';
import { TypeUserComponent } from './type-user.component';
import { CanDeactivateTypeUserDetails } from './type-user.guards';
import { TypeUserResolver } from './type-user.resolvers';

export const typeUserRoutes: Route[] = [
  {
    path: '',
    component: TypeUserComponent,
    children: [
      {
        path: '',
        component: TypeUserListComponent,
        children: [
          {
            path: ':id_type_user',
            component: TypeUserDetailsComponent,
            resolve: {
              task: TypeUserResolver,
            },
            canDeactivate: [CanDeactivateTypeUserDetails],
          },
        ],
      },
    ],
  },
];
