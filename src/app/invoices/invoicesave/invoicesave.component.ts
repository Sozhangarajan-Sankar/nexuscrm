import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { InvoiceService } from '../invoiceservice.service';
import { CustomerService } from '../../customers/customerservice.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { Customer } from '../../customers/customer.model';

@Component({
  selector: 'app-invoicesave',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CurrencyPipe, NgFor, NgIf, PageHeaderComponent],
  templateUrl: './invoicesave.component.html',
  styleUrl: './invoicesave.component.css'
})
export class InvoicesaveComponent implements OnInit {
  private fb = inject(FormBuilder);
  private invoiceService = inject(InvoiceService);
  private customerService = inject(CustomerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEditMode = false;
  editId: string | null = null;
  customers: Customer[] = [];
  subtotal = 0;
  taxAmount = 0;
  total = 0;

  invoiceForm: FormGroup = this.fb.group({
    customerId: ['', Validators.required],
    status: ['draft'],
    dueDate: [''],
    taxRate: [0],
    notes: [''],
    items: this.fb.array([])
  });

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(c => this.customers = c);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.editId = id;
        this.invoiceService.getInvoiceById(id).subscribe(invoice => {
          if (invoice) {
            this.invoiceForm.patchValue({
              customerId: invoice.customerId,
              status: invoice.status,
              dueDate: invoice.dueDate,
              tax: invoice.tax,
              notes: invoice.notes,
            });
            invoice.items.forEach(item => this.addItem(item));
            this.calculateTotals();
          }
        });
      }
    });
    if (!this.isEditMode) this.addItem();
  }

  createItem(item?: { description: string; quantity: number; rate: number; amount: number }) {
    return this.fb.group({
      description: [item?.description || ''],
      quantity: [item?.quantity || 1],
      rate: [item?.rate || 0],
      amount: [{ value: item?.amount || 0, disabled: true }]
    });
  }

  addItem(item?: { description: string; quantity: number; rate: number; amount: number }) {
    this.items.push(this.createItem(item));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.calculateTotals();
  }

  calculateItemAmount(index: number) {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const rate = item.get('rate')?.value || 0;
    const amount = quantity * rate;
    item.get('amount')?.setValue(amount, { emitEvent: false });
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = 0;
    this.items.controls.forEach(item => {
      const qty = item.get('quantity')?.value || 0;
      const rate = item.get('rate')?.value || 0;
      this.subtotal += qty * rate;
    });
    const taxRate = this.invoiceForm.get('taxRate')?.value || 0;
    this.taxAmount = this.subtotal * (taxRate / 100);
    this.total = this.subtotal + this.taxAmount;
  }

  onSubmit() {
    if (this.invoiceForm.invalid) return;
    const formValue = this.invoiceForm.getRawValue();
    const data = {
      customerId: formValue.customerId,
      status: formValue.status,
      dueDate: formValue.dueDate,
      taxRate: formValue.taxRate,
      notes: formValue.notes,
      items: formValue.items.map((item: any) => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        amount: item.quantity * item.rate
      })),
      subtotal: this.subtotal,
      taxAmount: this.taxAmount,
      total: this.total,
    };

    if (this.isEditMode && this.editId) {
      this.invoiceService.updateInvoice(this.editId, data).subscribe(() => this.router.navigate(['/invoices/view', this.editId]));
    } else {
      this.invoiceService.addInvoice(data).subscribe(inv => this.router.navigate(['/invoices/view', inv.id]));
    }
  }
}
