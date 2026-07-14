import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { LoadingSkeletonComponent } from '../loading-skeleton/loading-skeleton.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  template?: 'text' | 'status' | 'avatar' | 'currency' | 'date';
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, DatePipe, StatusBadgeComponent, LoadingSkeletonComponent, EmptyStateComponent],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  @Input() columns: Column[] = [];
  @Input() data: any[] = [];
  @Input() pageSize: number = 10;
  @Input() loading: boolean = false;
  @Input() cellTemplates: any;
  @Input() actionsTemplate: any;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();
  @Output() sort = new EventEmitter<{key: string, direction: 'asc' | 'desc'}>();

  currentPage: number = 1;
  sortKey: string = '';
  sortDir: 'asc' | 'desc' = 'asc';

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize) || 1;
  }

  get pagedData(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const total = this.totalPages;
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(total, this.currentPage + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  toggleSort(key: string) {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDir = 'asc';
    }
    this.sort.emit({ key: this.sortKey, direction: this.sortDir });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
}
