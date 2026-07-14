import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { DealService } from '../dealservice.service';
import { CustomerService } from '../../customers/customerservice.service';
import { AuthService } from '../../auth/authservice.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { Deal } from '../deal.model';
import { Customer } from '../../customers/customer.model';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-deallist',
  standalone: true,
  imports: [RouterLink, FormsModule, CurrencyPipe, DatePipe, NgClass, NgFor, NgIf, PageHeaderComponent],
  templateUrl: './deallist.component.html',
  styleUrl: './deallist.component.css'
})
export class DeallistComponent implements OnInit {
  private dealService = inject(DealService);
  private customerService = inject(CustomerService);
  private authService = inject(AuthService);
  private router = inject(Router);

  deals: Deal[] = [];
  customers: Customer[] = [];
  users: User[] = [];
  filteredDeals: Deal[] = [];
  searchQuery = '';
  stageFilter = '';
  stages = ['Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

  ngOnInit() {
    this.dealService.getDeals().subscribe(deals => {
      this.deals = deals;
      this.applyFilters();
    });
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
    this.authService.getUsers().subscribe(users => this.users = users);
  }

  getCustomerName(customerId: number): string {
    const c = this.customers.find(c => c.id === customerId);
    return c ? `${c.firstName} ${c.lastName}` : 'Unknown';
  }

  getUserName(userId: number): string {
    const u = this.users.find(u => u.id === userId);
    return u ? `${u.firstName} ${u.lastName}` : 'Unknown';
  }

  applyFilters() {
    let result = [...this.deals];
    const q = this.searchQuery.toLowerCase();
    if (q) result = result.filter(d => d.title.toLowerCase().includes(q));
    if (this.stageFilter) result = result.filter(d => d.stage === this.stageFilter);
    this.filteredDeals = result;
  }

  deleteDeal(id: number) {
    if (confirm('Delete this deal?')) {
      this.dealService.deleteDeal(id).subscribe(() => {
        this.dealService.getDeals().subscribe(deals => {
          this.deals = deals;
          this.applyFilters();
        });
      });
    }
  }

  getStageClass(stage: string): string {
    const map: Record<string, string> = {
      Qualification: 'badge-info',
      Proposal: 'badge-primary',
      Negotiation: 'badge-warning',
      'Closed Won': 'badge-success',
      'Closed Lost': 'badge-danger'
    };
    return map[stage] || '';
  }
}
