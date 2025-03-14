import { Route } from '@angular/router';
import { FormsComponent } from './forms/forms.component';

export const formsRoutes: Route[] = [{ path: '', component: FormsComponent }, {
  path: 'dual-edit',
  loadComponent: () => import('./dual-editable-form/dual-editable-form.component').then(c => c.DualEditableFormComponent)
}];
