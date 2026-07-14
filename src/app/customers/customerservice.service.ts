import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './customer.model';
import { CUSTOMERS } from './customers.mock';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private customers = [...CUSTOMERS];

  getAll(): Observable<Customer[]> {
    return of(this.customers);
  }

  getById(id: number): Observable<Customer | undefined> {
    return of(this.customers.find(c => c.id === id));
  }

  create(customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Observable<Customer> {
    const now = new Date();
    const newCustomer: Customer = {
      ...customer,
      id: Math.max(...this.customers.map(c => c.id), 0) + 1,
      createdAt: now,
      updatedAt: now
    };
    this.customers.push(newCustomer);
    return of(newCustomer);
  }

  update(id: number, changes: Partial<Customer>): Observable<Customer> {
    const index = this.customers.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Customer not found');
    this.customers[index] = { ...this.customers[index], ...changes, updatedAt: new Date() };
    return of(this.customers[index]);
  }

  delete(id: number): Observable<boolean> {
    const index = this.customers.findIndex(c => c.id === id);
    if (index === -1) return of(false);
    this.customers.splice(index, 1);
    return of(true);
  }

  search(query: string): Observable<Customer[]> {
    const q = query.toLowerCase();
    return of(this.customers.filter(c =>
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q)
    ));
  }

  getCustomers(): Observable<Customer[]> { return this.getAll(); }
  getCustomer(id: string | number): Observable<Customer | undefined> { return this.getById(typeof id === 'string' ? +id : id); }
  createCustomer(data: any): Observable<Customer> { return this.create(data); }
  updateCustomer(id: string | number, data: Partial<Customer>): Observable<Customer> { return this.update(typeof id === 'string' ? +id : id, data); }
  deleteCustomer(id: string | number): Observable<boolean> { return this.delete(typeof id === 'string' ? +id : id); }
}
