import { User } from './user.model';

export const USERS: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@nexuscrm.com',
    password: 'admin123',
    firstName: 'Sarah',
    lastName: 'Chen',
    avatar: 'https://i.pravatar.cc/150?u=sarahchen',
    role: 'admin',
    createdAt: new Date('2024-01-01')
  },
  {
    id: 2,
    username: 'manager',
    email: 'manager@nexuscrm.com',
    password: 'manager123',
    firstName: 'Marcus',
    lastName: 'Johnson',
    avatar: 'https://i.pravatar.cc/150?u=marcusjohnson',
    role: 'manager',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 3,
    username: 'user',
    email: 'user@nexuscrm.com',
    password: 'user123',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    avatar: 'https://i.pravatar.cc/150?u=emilyrodriguez',
    role: 'user',
    createdAt: new Date('2024-02-01')
  }
];
