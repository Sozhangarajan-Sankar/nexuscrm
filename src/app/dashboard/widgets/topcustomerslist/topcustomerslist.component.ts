import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../customers/customer.model';

interface TopCustomer { customer: Customer; totalDeals: number; totalValue: number; }

@Component({
  selector: 'app-topcustomerslist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topcustomerslist.component.html',
  styleUrl: './topcustomerslist.component.css'
})
export class TopcustomerslistComponent {
  @Input() customers: TopCustomer[] = [];

  getInitials(name: string): string {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  formatValue(value: number): string {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
    return value.toString();
  }
}
