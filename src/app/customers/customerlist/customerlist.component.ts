import { Component, OnInit, inject, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../customerservice.service';
import { Customer } from '../customer.model';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { DataTableComponent, Column } from '../../shared/components/data-table/data-table.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PageHeaderComponent, DataTableComponent, StatusBadgeComponent, ConfirmDialogComponent],
  templateUrl: './customerlist.component.html',
  styleUrl: './customerlist.component.css'
})
export class CustomerlistComponent implements OnInit, AfterViewInit {
  private customerService = inject(CustomerService);
  private router = inject(Router);

  @ViewChild('nameCell', { static: true }) nameCellTpl!: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCellTpl!: TemplateRef<any>;
  @ViewChild('createdCell', { static: true }) createdCellTpl!: TemplateRef<any>;

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchQuery = '';
  showDeleteDialog = false;
  customerToDelete: Customer | null = null;

  columns: Column[] = [
    { key: 'firstName', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'status', label: 'Status' },
    { key: 'createdAt', label: 'Created' }
  ];

  cellTemplates: { [key: string]: TemplateRef<any> } = {};

  get deleteMessage(): string {
    if (!this.customerToDelete) return '';
    return 'Are you sure you want to delete ' + this.customerToDelete.firstName + ' ' + this.customerToDelete.lastName + '? This action cannot be undone.';
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngAfterViewInit(): void {
    this.cellTemplates = {
      name: this.nameCellTpl,
      status: this.statusCellTpl,
      createdAt: this.createdCellTpl
    };
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
      this.filteredCustomers = [...data];
    });
  }

  filterCustomers(query: string): void {
    this.searchQuery = query;
    if (!query.trim()) {
      this.filteredCustomers = [...this.customers];
      return;
    }
    const q = query.toLowerCase();
    this.filteredCustomers = this.customers.filter(c =>
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.company || '').toLowerCase().includes(q)
    );
  }

  viewCustomer(customer: Customer): void {
    this.router.navigate(['/customers/view', customer.id]);
  }

  editCustomer(customer: Customer): void {
    this.router.navigate(['/customers/save', customer.id]);
  }

  confirmDelete(customer: Customer): void {
    this.customerToDelete = customer;
    this.showDeleteDialog = true;
  }

  onDeleteConfirm(): void {
    if (!this.customerToDelete) return;
    this.customerService.deleteCustomer(this.customerToDelete.id).subscribe(() => {
      this.showDeleteDialog = false;
      this.customerToDelete = null;
      this.loadCustomers();
    });
  }
}
