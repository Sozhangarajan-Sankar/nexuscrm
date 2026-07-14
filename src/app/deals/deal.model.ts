export interface Deal {
  id: number;
  title: string;
  value: number;
  currency: string;
  stage: 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  customerId: number;
  assignedTo: number;
  expectedCloseDate: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}
