import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Deal } from './deal.model';
import { DEALS } from './deals.mock';

@Injectable({ providedIn: 'root' })
export class DealService {
  private deals = [...DEALS];

  getAll(): Observable<Deal[]> {
    return of(this.deals);
  }

  getById(id: number): Observable<Deal | undefined> {
    return of(this.deals.find(d => d.id === id));
  }

  create(deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Observable<Deal> {
    const now = new Date();
    const newDeal: Deal = {
      ...deal,
      id: Math.max(...this.deals.map(d => d.id), 0) + 1,
      createdAt: now,
      updatedAt: now
    };
    this.deals.push(newDeal);
    return of(newDeal);
  }

  update(id: number, changes: Partial<Deal>): Observable<Deal> {
    const index = this.deals.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Deal not found');
    this.deals[index] = { ...this.deals[index], ...changes, updatedAt: new Date() };
    return of(this.deals[index]);
  }

  delete(id: number): Observable<boolean> {
    const index = this.deals.findIndex(d => d.id === id);
    if (index === -1) return of(false);
    this.deals.splice(index, 1);
    return of(true);
  }

  getByStage(stage: Deal['stage']): Observable<Deal[]> {
    return of(this.deals.filter(d => d.stage === stage));
  }

  getByCustomerId(customerId: number): Observable<Deal[]> {
    return of(this.deals.filter(d => d.customerId === customerId));
  }

  getDeals(): Observable<Deal[]> { return this.getAll(); }
  getDealById(id: string | number): Observable<Deal | undefined> { return this.getById(typeof id === 'string' ? +id : id); }
  addDeal(data: any): Observable<Deal> { return this.create(data); }
  updateDeal(id: string | number, data: Partial<Deal>): Observable<Deal> { return this.update(typeof id === 'string' ? +id : id, data); }
  deleteDeal(id: string | number): Observable<boolean> { return this.delete(typeof id === 'string' ? +id : id); }
}
