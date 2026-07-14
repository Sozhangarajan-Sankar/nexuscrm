export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: Date;
  assignedTo: number;
  relatedTo?: { type: 'customer' | 'deal' | 'invoice'; id: number };
  createdAt: Date;
  updatedAt: Date;
}
