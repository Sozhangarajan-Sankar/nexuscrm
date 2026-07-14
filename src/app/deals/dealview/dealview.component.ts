import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { DealService } from '../dealservice.service';
import { CustomerService } from '../../customers/customerservice.service';
import { AuthService } from '../../auth/authservice.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { Deal } from '../deal.model';
import { Customer } from '../../customers/customer.model';
import { User } from '../../auth/user.model';

interface ActivityItem {
  action: string;
  detail: string;
  date: Date;
  type: string;
}

@Component({
  selector: 'app-dealview',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe, NgClass, NgFor, NgIf, PageHeaderComponent],
  templateUrl: './dealview.component.html',
  styleUrl: './dealview.component.css'
})
export class DealviewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dealService = inject(DealService);
  private customerService = inject(CustomerService);
  private authService = inject(AuthService);

  dealId: string = '';
  deal: Deal | null = null;
  customer: Customer | null = null;
  assignedUser: User | null = null;
  activities: ActivityItem[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.dealId = id;
        this.loadDeal(id);
      }
    });
  }

  loadDeal(id: string) {
    this.dealService.getDealById(id).subscribe(deal => {
      if (deal) {
        this.deal = deal;
        this.customerService.getCustomer(deal.customerId).subscribe(c => this.customer = c || null);
        this.authService.getUserById(deal.assignedTo).subscribe(u => this.assignedUser = u || null);
        this.generateTimeline(deal);
      }
    });
  }

  generateTimeline(deal: Deal) {
    this.activities = [
      { action: 'Deal Created', detail: `"${deal.title}" was created with a value of ${deal.currency} ${deal.value?.toLocaleString()}`, date: deal.createdAt, type: 'created' },
      { action: 'Stage Updated', detail: `Stage set to ${deal.stage}`, date: deal.updatedAt, type: 'updated' },
      { action: 'Customer Assigned', detail: `Customer ID: ${deal.customerId}`, date: deal.createdAt, type: 'created' },
    ];
  }

  deleteDeal() {
    if (confirm('Delete this deal permanently?')) {
      this.dealService.deleteDeal(this.dealId).subscribe(() => this.router.navigate(['/deals']));
    }
  }

  getStageClass(stage: string): string {
    const map: Record<string, string> = {
      Qualification: 'badge-info', Proposal: 'badge-primary', Negotiation: 'badge-warning',
      'Closed Won': 'badge-success', 'Closed Lost': 'badge-danger'
    };
    return map[stage] || '';
  }
}
