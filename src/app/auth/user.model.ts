export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: 'admin' | 'manager' | 'user';
  createdAt: Date;
}
