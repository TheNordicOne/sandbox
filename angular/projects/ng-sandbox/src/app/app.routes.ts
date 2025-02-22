import { Route } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'

export const appRoutes: Route[] = [
  {
    path: 'forms',
    loadChildren: () => import('forms').then((m) => m.formsRoutes),
  },
  {
    path: 'accessibility',
    loadChildren: () =>
      import('accessibility').then((m) => m.accessibilityRoutes),
  },
  {
    path: 'home',
    component: DashboardComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
]
