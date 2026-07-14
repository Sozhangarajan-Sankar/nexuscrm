import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth/authservice.service';
import { Router } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES),
    loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
  },
  {
    path: '',
    loadComponent: () => import('./layout/shell/shell.component').then(m => m.ShellComponent),
    canActivate: [() => {
      const auth = inject(AuthService);
      const router = inject(Router);
      if (!auth.isLoggedIn()) {
        router.navigate(['/auth/login']);
        return false;
      }
      return true;
    }],
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) },
      { path: 'customers', loadChildren: () => import('./customers/customers.routes').then(m => m.CUSTOMERS_ROUTES) },
      { path: 'deals', loadChildren: () => import('./deals/deals.routes').then(m => m.DEALS_ROUTES) },
      { path: 'tasks', loadChildren: () => import('./tasks/tasks.routes').then(m => m.TASKS_ROUTES) },
      { path: 'invoices', loadChildren: () => import('./invoices/invoices.routes').then(m => m.INVOICES_ROUTES) },
      { path: 'profile', loadChildren: () => import('./profile/profile.routes').then(m => m.PROFILE_ROUTES) },
      { path: 'settings', loadChildren: () => import('./settings/settings.routes').then(m => m.SETTINGS_ROUTES) },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/dashboard' },
];
