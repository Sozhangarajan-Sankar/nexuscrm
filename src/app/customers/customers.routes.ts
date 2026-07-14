import { Routes } from '@angular/router';
export const CUSTOMERS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./customerlist/customerlist.component').then(m => m.CustomerlistComponent) },
  { path: 'save', loadComponent: () => import('./customersave/customersave.component').then(m => m.CustomersaveComponent) },
  { path: 'save/:id', loadComponent: () => import('./customersave/customersave.component').then(m => m.CustomersaveComponent) },
  { path: 'view/:id', loadComponent: () => import('./customerview/customerview.component').then(m => m.CustomerviewComponent) },
];
