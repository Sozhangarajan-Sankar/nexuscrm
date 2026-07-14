import { Injectable, signal, computed } from '@angular/core';

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications = signal<Notification[]>([]);

  unreadCount = computed(() => this.notifications().filter(n => !n.read).length);

  getNotifications(): Notification[] {
    return this.notifications();
  }

  markAsRead(id: string): void {
    this.notifications.update(list =>
      list.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  addNotification(n: Notification): void {
    this.notifications.update(list => [n, ...list]);
  }
}
