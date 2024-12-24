import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'test-path/:id',
    loadComponent: () => import('./router/router.component').then(x => x.RouterComponent),
    // End up populated into the component as input
    data: { description: 'Customer profile page' },
    // End up populated into the component as input
    resolve: {},
    providers: []
  }
];
