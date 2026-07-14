import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { DealService } from '../dealservice.service';
import { CustomerService } from '../../customers/customerservice.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { Deal } from '../deal.model';
import { Customer } from '../../customers/customer.model';

@Component({
  selector: 'app-dealkanban',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, NgFor, NgIf, PageHeaderComponent],
  templateUrl: './dealkanban.component.html',
  styleUrl: './dealkanban.component.css'
})
export class DealkanbanComponent implements OnInit {
  private dealService = inject(DealService);
  private customerService = inject(CustomerService);

  deals: Deal[] = [];
  customers: Customer[] = [];
  columns = [
    { name: 'Qualification' },
    { name: 'Proposal' },
    { name: 'Negotiation' },
    { name: 'Closed Won' },
    { name: 'Closed Lost' },
  ];

  ngOnInit() {
    this.dealService.getDeals().subscribe(d => this.deals = d);
    this.customerService.getCustomers().subscribe(c => this.customers = c);
  }

  getDealsForStage(stage: string): Deal[] {
    return this.deals.filter(d => d.stage === stage);
  }

  getCustomerName(customerId: number): string {
    const c = this.customers.find(c => c.id === customerId);
    return c ? `${c.firstName} ${c.lastName}` : 'Unknown';
  }
}
