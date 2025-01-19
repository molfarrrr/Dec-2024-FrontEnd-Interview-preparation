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
  },
  {
    path: 'ngrx-signals',
    loadComponent: () => import('./ngrx-signals/ngrx-signals.component').then(x => x.NgrxSignalsComponent),
    providers: []
  },
  {
    path: 'angular-dev-theme',
    loadComponent: () => import('./material/angular-dev/angular-dev.component').then(x => x.AngularDevComponent),
    providers: []
  }
];
