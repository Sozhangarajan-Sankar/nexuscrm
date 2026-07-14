export interface Activity {
  id: number;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task' | 'deal' | 'invoice';
  subject: string;
  description: string;
  customerName?: string;
  userName?: string;
  relatedTo?: { type: 'customer' | 'deal' | 'invoice' | 'task'; id: number };
  performedBy: number;
  createdAt: Date;
}
