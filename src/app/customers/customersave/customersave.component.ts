import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customerservice.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-customer-save',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeaderComponent],
  templateUrl: './customersave.component.html',
  styleUrl: './customersave.component.css'
})
export class CustomersaveComponent implements OnInit {
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);

  customerForm!: FormGroup;
  isEditMode = false;
  isSaving = false;
  customerId: string | null = null;

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      position: [''],
      status: ['lead'],
      source: [''],
      tags: [''],
      notes: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.customerId = id;
      this.customerService.getCustomer(id).subscribe(customer => {
        if (customer) {
          this.customerForm.patchValue({
            ...customer,
            tags: (customer.tags || []).join(', ')
          });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.customerForm.invalid) return;
    this.isSaving = true;
    const formValue = this.customerForm.value;
    const data = {
      ...formValue,
      tags: formValue.tags ? formValue.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0) : []
    };

    const request = this.isEditMode && this.customerId
      ? this.customerService.updateCustomer(this.customerId, data)
      : this.customerService.createCustomer(data);

    request.subscribe({
      next: () => this.router.navigate(['/customers']),
      error: () => { this.isSaving = false; }
    });
  }

  cancel(): void {
    this.location.back();
  }
}
