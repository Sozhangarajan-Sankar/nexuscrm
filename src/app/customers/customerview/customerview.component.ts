import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../customerservice.service';
import { ActivityService } from '../../activities/activityservice.service';
import { Customer } from '../customer.model';
import { Activity } from '../../activities/activity.model';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-customer-view',
  standalone: true,
  imports: [CommonModule, RouterLink, PageHeaderComponent, StatusBadgeComponent],
  templateUrl: './customerview.component.html',
  styleUrl: './customerview.component.css'
})
export class CustomerviewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private customerService = inject(CustomerService);
  private activityService = inject(ActivityService);

  customerId: string | null = null;
  customer: Customer | null = null;
  activities: Activity[] = [];

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => {
        this.customerId = id;
        return id ? this.customerService.getCustomer(id) : of(null);
      })
    ).subscribe(customer => {
      this.customer = customer || null;
      if (this.customerId) {
        this.activityService.getActivities(this.customerId).subscribe(activities => {
          this.activities = activities;
        });
      }
    });
  }

  getActivityIcon(type: string): string {
    const icons: Record<string, string> = {
      call: 'C', email: 'E', meeting: 'M', task: 'T', deal: 'D', note: 'N', system: 'S'
    };
    return icons[type] || '?';
  }

  getActivityColor(type: string): string {
    const colors: Record<string, string> = {
      call: '#6366f1', email: '#3b82f6', meeting: '#8b5cf6',
      task: '#22c55e', deal: '#f59e0b', note: '#6b7280', system: '#ec4899'
    };
    return colors[type] || '#6b7280';
  }

  goBack(): void {
    this.router.navigate(['/customers']);
  }

  deleteCustomer(): void {
    if (!this.customerId || !this.customer) return;
    if (confirm('Are you sure you want to delete ' + this.customer.firstName + ' ' + this.customer.lastName + '?')) {
      this.customerService.deleteCustomer(this.customerId).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    }
  }
}
