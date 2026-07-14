export interface StatInfo { label: string; value: string | number; icon: string; trend: 'up' | 'down' | 'neutral'; trendValue: string; }
export interface MonthlyRevenue { month: string; revenue: number; }
export interface StageInfo { stage: string; count: number; value: number; }
export interface TopCustomerInfo { customer: Customer; totalDeals: number; totalValue: number; }

import { Injectable } from '@angular/core';
import { Observable, of, combineLatest, map } from 'rxjs';
import { CustomerService } from '../customers/customerservice.service';
import { DealService } from '../deals/dealservice.service';
import { TaskService } from '../tasks/taskservice.service';
import { InvoiceService } from '../invoices/invoiceservice.service';
import { ActivityService } from '../activities/activityservice.service';
import { Activity } from '../activities/activity.model';
import { Customer } from '../customers/customer.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(
    private customerService: CustomerService,
    private dealService: DealService,
    private taskService: TaskService,
    private invoiceService: InvoiceService,
    private activityService: ActivityService
  ) {}

  getTotalRevenue(): Observable<number> {
    return this.invoiceService.getAll().pipe(
      map(invoices => invoices
        .filter(inv => inv.status === 'paid' || inv.status === 'sent')
        .reduce((sum, inv) => sum + inv.total, 0)
      )
    );
  }

  getDealsByStage(): Observable<{ stage: string; count: number; value: number }[]> {
    return this.dealService.getAll().pipe(
      map(deals => {
        const stages = ['qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost'];
        return stages.map(stage => {
          const filtered = deals.filter(d => d.stage === stage);
          return {
            stage,
            count: filtered.length,
            value: filtered.reduce((sum, d) => sum + d.value, 0)
          };
        });
      })
    );
  }

  getRecentActivities(limit: number = 10): Observable<Activity[]> {
    return this.activityService.getAll().pipe(
      map(activities => activities.slice(0, limit))
    );
  }

  getTopCustomers(limit: number = 5): Observable<{ customer: Customer; totalDeals: number; totalValue: number }[]> {
    return combineLatest([
      this.customerService.getAll(),
      this.dealService.getAll()
    ]).pipe(
      map(([customers, deals]) => {
        const customerMap = new Map<number, { deals: number; value: number }>();
        for (const deal of deals) {
          const entry = customerMap.get(deal.customerId) || { deals: 0, value: 0 };
          entry.deals++;
          entry.value += deal.value;
          customerMap.set(deal.customerId, entry);
        }
        return customers
          .map(customer => ({
            customer,
            totalDeals: customerMap.get(customer.id)?.deals || 0,
            totalValue: customerMap.get(customer.id)?.value || 0
          }))
          .sort((a, b) => b.totalValue - a.totalValue)
          .slice(0, limit);
      })
    );
  }

  getMonthlyRevenue(): Observable<{ month: string; revenue: number }[]> {
    return this.invoiceService.getAll().pipe(
      map(invoices => {
        const monthlyMap = new Map<string, number>();
        const paidInvoices = invoices.filter(inv => inv.status === 'paid');
        for (const inv of paidInvoices) {
          const key = `${inv.createdAt.getFullYear()}-${String(inv.createdAt.getMonth() + 1).padStart(2, '0')}`;
          monthlyMap.set(key, (monthlyMap.get(key) || 0) + inv.total);
        }
        return Array.from(monthlyMap.entries())
          .map(([month, revenue]) => ({ month, revenue }))
          .sort((a, b) => a.month.localeCompare(b.month));
      })
    );
  }

  getDashboardStats(): Observable<{
    totalCustomers: number;
    totalDeals: number;
    totalTasks: number;
    totalRevenue: number;
    dealsClosed: number;
    tasksCompleted: number;
  }> {
    return combineLatest([
      this.customerService.getAll(),
      this.dealService.getAll(),
      this.taskService.getAll(),
      this.getTotalRevenue()
    ]).pipe(
      map(([customers, deals, tasks, totalRevenue]) => ({
        totalCustomers: customers.length,
        totalDeals: deals.length,
        totalTasks: tasks.length,
        totalRevenue,
        dealsClosed: deals.filter(d => d.stage === 'closed-won').length,
        tasksCompleted: tasks.filter(t => t.status === 'done').length
      }))
    );
  }
}
