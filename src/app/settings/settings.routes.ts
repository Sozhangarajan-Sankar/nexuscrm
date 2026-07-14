import { Routes } from '@angular/router';
export const SETTINGS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./generalsettings/generalsettings.component').then(m => m.GeneralsettingsComponent) },
  { path: 'notifications', loadComponent: () => import('./notificationsettings/notificationsettings.component').then(m => m.NotificationsettingsComponent) },
];
