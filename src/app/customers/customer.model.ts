export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  avatar: string;
  status: 'active' | 'inactive' | 'lead';
  source: string;
  tags: string[];
  notes: string;
  assignedTo: number;
  createdAt: Date;
  updatedAt: Date;
}
