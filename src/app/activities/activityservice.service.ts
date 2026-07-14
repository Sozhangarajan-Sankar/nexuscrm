import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Activity } from './activity.model';
import { ACTIVITIES } from './activities.mock';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private activities = [...ACTIVITIES];

  getAll(): Observable<Activity[]> {
    return of(this.activities);
  }

  getByRelatedTo(type: 'customer' | 'deal' | 'invoice' | 'task', id: number): Observable<Activity[]> {
    return of(this.activities.filter(a => a.relatedTo?.type === type && a.relatedTo?.id === id));
  }

  create(activity: Omit<Activity, 'id' | 'createdAt'>): Observable<Activity> {
    const newActivity: Activity = {
      ...activity,
      id: Math.max(...this.activities.map(a => a.id), 0) + 1,
      createdAt: new Date()
    };
    this.activities.unshift(newActivity);
    return of(newActivity);
  }

  getActivities(customerId?: string | number): Observable<Activity[]> {
    if (customerId) {
      const id = typeof customerId === 'string' ? +customerId : customerId;
      return of(this.activities.filter(a => a.relatedTo?.type === 'customer' && a.relatedTo?.id === id));
    }
    return this.getAll();
  }
}
