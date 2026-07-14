import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

interface ToggleItem {
  label: string;
  key: string;
  enabled: boolean;
}

@Component({
  selector: 'app-notificationsettings',
  standalone: true,
  imports: [NgClass, NgFor, PageHeaderComponent],
  templateUrl: './notificationsettings.component.html',
  styleUrl: './notificationsettings.component.css'
})
export class NotificationsettingsComponent {
  toggles: ToggleItem[] = [
    { label: 'Email Notifications', key: 'email', enabled: true },
    { label: 'Deal Updates', key: 'deals', enabled: true },
    { label: 'Task Assignments', key: 'tasks', enabled: true },
    { label: 'Invoice Updates', key: 'invoices', enabled: true },
    { label: 'New Customer Alerts', key: 'customers', enabled: false },
    { label: 'Weekly Reports', key: 'reports', enabled: true },
  ];

  showNotification = false;
  notifMessage = '';
  notifType: 'success' | 'error' = 'success';

  constructor() {
    const stored = localStorage.getItem('nexus_notif_prefs');
    if (stored) {
      const prefs = JSON.parse(stored);
      this.toggles.forEach(t => {
        if (prefs[t.key] !== undefined) {
          t.enabled = prefs[t.key];
        }
      });
    }
  }

  toggle(key: string): void {
    const item = this.toggles.find(t => t.key === key);
    if (item) item.enabled = !item.enabled;
  }

  save(): void {
    const prefs: Record<string, boolean> = {};
    this.toggles.forEach(t => prefs[t.key] = t.enabled);
    localStorage.setItem('nexus_notif_prefs', JSON.stringify(prefs));
    this.notifMessage = 'Notification preferences saved';
    this.notifType = 'success';
    this.showNotification = true;
    setTimeout(() => this.showNotification = false, 3000);
  }
}
