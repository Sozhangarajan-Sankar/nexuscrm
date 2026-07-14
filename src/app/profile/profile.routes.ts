import { Routes } from '@angular/router';
export const PROFILE_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./profilesave/profilesave.component').then(m => m.ProfilesaveComponent) },
];
