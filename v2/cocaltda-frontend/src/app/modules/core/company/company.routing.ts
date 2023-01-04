import { Route } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CanDeactivateCompanyDetails } from './company.guards';
import { CompanyResolver } from './company.resolvers';
import { CompanyDetailsComponent } from './details/details.component';
import { CompanyListComponent } from './list/list.component';

export const companyRoutes: Route[] = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      {
        path: '',
        component: CompanyListComponent,
        children: [
          {
            path: ':id_company',
            component: CompanyDetailsComponent,
            resolve: {
              task: CompanyResolver,
            },
            canDeactivate: [CanDeactivateCompanyDetails],
          },
        ],
      },
    ],
  },
];
