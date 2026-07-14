import { Routes } from '@angular/router';
export const INVOICES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./invoicelist/invoicelist.component').then(m => m.InvoicelistComponent) },
  { path: 'save', loadComponent: () => import('./invoicesave/invoicesave.component').then(m => m.InvoicesaveComponent) },
  { path: 'save/:id', loadComponent: () => import('./invoicesave/invoicesave.component').then(m => m.InvoicesaveComponent) },
  { path: 'view/:id', loadComponent: () => import('./invoiceview/invoiceview.component').then(m => m.InvoiceviewComponent) },
];
