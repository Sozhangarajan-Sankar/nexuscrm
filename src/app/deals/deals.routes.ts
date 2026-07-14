import { Routes } from '@angular/router';
export const DEALS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./deallist/deallist.component').then(m => m.DeallistComponent) },
  { path: 'save', loadComponent: () => import('./dealsave/dealsave.component').then(m => m.DealsaveComponent) },
  { path: 'save/:id', loadComponent: () => import('./dealsave/dealsave.component').then(m => m.DealsaveComponent) },
  { path: 'view/:id', loadComponent: () => import('./dealview/dealview.component').then(m => m.DealviewComponent) },
  { path: 'kanban', loadComponent: () => import('./dealkanban/dealkanban.component').then(m => m.DealkanbanComponent) },
];
