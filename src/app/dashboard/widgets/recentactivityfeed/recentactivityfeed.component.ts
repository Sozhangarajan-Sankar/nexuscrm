import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Activity } from '../../../activities/activity.model';

@Component({
  selector: 'app-recentactivityfeed',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './recentactivityfeed.component.html',
  styleUrl: './recentactivityfeed.component.css'
})
export class RecentactivityfeedComponent {
  @Input() activities: Activity[] = [];

  getActivityIcon(type: string): string {
    const icons: Record<string, string> = {
      call: 'C', email: 'E', meeting: 'M', task: 'T', deal: 'D', note: 'N', system: 'S'
    };
    return icons[type] || '?';
  }

  getActivityColor(type: string): string {
    const colors: Record<string, string> = {
      call: '#6366f1', email: '#3b82f6', meeting: '#8b5cf6',
      task: '#22c55e', deal: '#f59e0b', note: '#6b7280', system: '#ec4899'
    };
    return colors[type] || '#6b7280';
  }
}
