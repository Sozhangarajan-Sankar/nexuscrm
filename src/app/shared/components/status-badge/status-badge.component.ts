import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css'
})
export class StatusBadgeComponent {
  @Input() status: string = '';
  @Input() type: 'generic' | 'deal' | 'task' | 'invoice' = 'generic';

  get badgeClass(): string {
    const s = (this.status || '').toLowerCase().replace(/\s+/g, '-');
    const map: Record<string, Record<string, string>> = {
      deal: { open: 'status-open', won: 'status-won', lost: 'status-lost', pending: 'status-pending', closed: 'status-closed' },
      task: { 'in-progress': 'status-in-progress', completed: 'status-completed', pending: 'status-pending', cancelled: 'status-cancelled', new: 'status-new' },
      invoice: { paid: 'status-paid', overdue: 'status-overdue', pending: 'status-pending', draft: 'status-draft', sent: 'status-sent', partial: 'status-partial' }
    };
    const typeMap = map[this.type];
    if (typeMap && typeMap[s]) {
      return 'status-badge ' + typeMap[s];
    }
    const generic: Record<string, string> = {
      active: 'status-active', inactive: 'status-inactive', pending: 'status-pending', completed: 'status-completed',
      cancelled: 'status-cancelled', open: 'status-open', closed: 'status-closed', lead: 'status-lead', new: 'status-new',
      won: 'status-won', lost: 'status-lost', paid: 'status-paid', overdue: 'status-overdue', draft: 'status-draft',
      sent: 'status-sent', 'in-progress': 'status-in-progress', partial: 'status-partial'
    };
    return 'status-badge ' + (generic[s] || 'status-default');
  }
}
