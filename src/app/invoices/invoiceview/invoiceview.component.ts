import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { InvoiceService } from '../invoiceservice.service';
import { CustomerService } from '../../customers/customerservice.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { Invoice } from '../invoice.model';
import { Customer } from '../../customers/customer.model';

@Component({
  selector: 'app-invoiceview',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe, NgClass, NgFor, NgIf, PageHeaderComponent],
  templateUrl: './invoiceview.component.html',
  styleUrl: './invoiceview.component.css'
})
export class InvoiceviewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private invoiceService = inject(InvoiceService);
  private customerService = inject(CustomerService);

  invoiceId: string = '';
  invoice: Invoice | null = null;
  customer: Customer | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.invoiceId = id;
        this.loadInvoice(id);
      }
    });
  }

  loadInvoice(id: string) {
    this.invoiceService.getInvoiceById(id).subscribe(invoice => {
      if (invoice) {
        this.invoice = invoice;
        this.customerService.getCustomer(invoice.customerId).subscribe(c => this.customer = c || null);
      }
    });
  }

  deleteInvoice() {
    if (confirm('Delete this invoice permanently?')) {
      this.invoiceService.deleteInvoice(this.invoiceId).subscribe(() => this.router.navigate(['/invoices']));
    }
  }

  printInvoice() {
    window.print();
  }

  isOverdue(): boolean {
    if (!this.invoice) return false;
    return this.invoice.status === 'sent' && new Date(this.invoice.dueDate) < new Date();
  }

  getStatusClass(status: string): string {
    return 'badge-' + status;
  }
}
