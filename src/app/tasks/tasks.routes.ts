import { Routes } from '@angular/router';
export const TASKS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./tasklist/tasklist.component').then(m => m.TasklistComponent) },
  { path: 'save', loadComponent: () => import('./tasksave/tasksave.component').then(m => m.TasksaveComponent) },
  { path: 'save/:id', loadComponent: () => import('./tasksave/tasksave.component').then(m => m.TasksaveComponent) },
  { path: 'board', loadComponent: () => import('./taskboard/taskboard.component').then(m => m.TaskboardComponent) },
];
