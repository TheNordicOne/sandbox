import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const appRoutes: Route[] = [
  {
    path: 'forms',
    loadChildren: () => import('sandbox-forms').then(m => m.formsRoutes)
  },

  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
