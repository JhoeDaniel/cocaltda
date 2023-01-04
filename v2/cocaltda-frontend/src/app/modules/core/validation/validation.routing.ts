import { Route } from '@angular/router';
import { ValidationDetailsComponent } from './details/details.component';
import { ValidationListComponent } from './list/list.component';
import { ValidationComponent } from './validation.component';
import { CanDeactivateValidationDetails } from './validation.guards';
import { ValidationResolver } from './validation.resolvers';

export const validationRoutes: Route[] = [
  {
    path: '',
    component: ValidationComponent,
    children: [
      {
        path: '',
        component: ValidationListComponent,
        children: [
          {
            path: ':id_validation',
            component: ValidationDetailsComponent,
            resolve: {
              task: ValidationResolver,
            },
            canDeactivate: [CanDeactivateValidationDetails],
          },
        ],
      },
    ],
  },
];
