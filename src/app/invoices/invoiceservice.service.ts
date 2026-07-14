import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Invoice } from './invoice.model';
import { INVOICES } from './invoices.mock';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private invoices = [...INVOICES];

  private nextInvoiceNumber(): string {
    const year = new Date().getFullYear();
    const maxNum = this.invoices.reduce((max, inv) => {
      const parts = inv.invoiceNumber.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `INV-${year}-${String(maxNum + 1).padStart(4, '0')}`;
  }

  getAll(): Observable<Invoice[]> {
    return of(this.invoices);
  }

  getById(id: number): Observable<Invoice | undefined> {
    return of(this.invoices.find(inv => inv.id === id));
  }

  create(invoice: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt' | 'updatedAt'>): Observable<Invoice> {
    const now = new Date();
    const newInvoice: Invoice = {
      ...invoice,
      id: Math.max(...this.invoices.map(inv => inv.id), 0) + 1,
      invoiceNumber: this.nextInvoiceNumber(),
      createdAt: now,
      updatedAt: now
    };
    this.invoices.push(newInvoice);
    return of(newInvoice);
  }

  update(id: number, changes: Partial<Invoice>): Observable<Invoice> {
    const index = this.invoices.findIndex(inv => inv.id === id);
    if (index === -1) throw new Error('Invoice not found');
    this.invoices[index] = { ...this.invoices[index], ...changes, updatedAt: new Date() };
    return of(this.invoices[index]);
  }

  delete(id: number): Observable<boolean> {
    const index = this.invoices.findIndex(inv => inv.id === id);
    if (index === -1) return of(false);
    this.invoices.splice(index, 1);
    return of(true);
  }

  getInvoices(): Observable<Invoice[]> { return this.getAll(); }
  getInvoiceById(id: string | number): Observable<Invoice | undefined> { return this.getById(typeof id === 'string' ? +id : id); }
  addInvoice(data: any): Observable<Invoice> { return this.create(data); }
  updateInvoice(id: string | number, data: Partial<Invoice>): Observable<Invoice> { return this.update(typeof id === 'string' ? +id : id, data); }
  deleteInvoice(id: string | number): Observable<boolean> { return this.delete(typeof id === 'string' ? +id : id); }
}
