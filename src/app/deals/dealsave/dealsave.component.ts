import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { DealService } from '../dealservice.service';
import { CustomerService } from '../../customers/customerservice.service';
import { AuthService } from '../../auth/authservice.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { Customer } from '../../customers/customer.model';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-dealsave',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgFor, NgIf, PageHeaderComponent],
  templateUrl: './dealsave.component.html',
  styleUrl: './dealsave.component.css'
})
export class DealsaveComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dealService = inject(DealService);
  private customerService = inject(CustomerService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEditMode = false;
  editId: string | null = null;
  customers: Customer[] = [];
  users: User[] = [];

  dealForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    value: [0, [Validators.required, Validators.min(0)]],
    currency: ['USD'],
    stage: ['Qualification'],
    probability: [0],
    customerId: [''],
    assignedTo: [''],
    expectedCloseDate: [''],
    notes: ['']
  });

  ngOnInit() {
    this.customerService.getCustomers().subscribe(c => this.customers = c);
    this.authService.getUsers().subscribe(u => this.users = u);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.editId = id;
        this.dealService.getDealById(id).subscribe(deal => {
          if (deal) this.dealForm.patchValue(deal);
        });
      }
    });
  }

  onSubmit() {
    if (this.dealForm.invalid) return;
    const data = this.dealForm.value;
    if (this.isEditMode && this.editId) {
      this.dealService.updateDeal(this.editId, data).subscribe(() => this.router.navigate(['/deals']));
    } else {
      this.dealService.addDeal(data).subscribe(() => this.router.navigate(['/deals']));
    }
  }
}
