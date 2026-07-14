import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { InvoiceService } from '../invoiceservice.service';
import { CustomerService } from '../../customers/customerservice.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { Invoice } from '../invoice.model';
import { Customer } from '../../customers/customer.model';

@Component({
  selector: 'app-invoicelist',
  standalone: true,
  imports: [RouterLink, FormsModule, CurrencyPipe, DatePipe, NgClass, NgFor, NgIf, PageHeaderComponent],
  templateUrl: './invoicelist.component.html',
  styleUrl: './invoicelist.component.css'})
export class InvoicelistComponent implements OnInit {
  private invoiceService = inject(InvoiceService);
  private customerService = inject(CustomerService);
  private router = inject(Router);

  invoices: Invoice[] = [];
  customers: Customer[] = [];
  filteredInvoices: Invoice[] = [];
  searchQuery = '';
  statusFilter = '';

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe(invoices => {
      this.invoices = invoices;
      this.applyFilters();
    });
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
  }

  getCustomerName(customerId: number): string {
    const c = this.customers.find(c => c.id === customerId);
    return c ? `${c.firstName} ${c.lastName}` : 'Unknown';
  }

  applyFilters() {
    let result = [...this.invoices];
    const q = this.searchQuery.toLowerCase();
    if (q) result = result.filter(inv => inv.invoiceNumber.toLowerCase().includes(q));
    if (this.statusFilter) result = result.filter(inv => inv.status === this.statusFilter);
    this.filteredInvoices = result;
  }

  deleteInvoice(id: number) {
    if (confirm('Delete this invoice?')) {
      this.invoiceService.deleteInvoice(id).subscribe(() => {
        this.invoiceService.getInvoices().subscribe(invoices => {
          this.invoices = invoices;
          this.applyFilters();
        });
      });
    }
  }

  getStatusClass(status: string): string {
    return 'badge-' + status;
  }
}
