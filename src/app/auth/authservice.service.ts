import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from './user.model';
import { USERS } from './users.mock';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSignal = signal<User | null>(this.loadUser());

  get currentUser() {
    return this.currentUserSignal.asReadonly();
  }

  private loadUser(): User | null {
    const stored = localStorage.getItem('nexus_current_user');
    if (stored) return JSON.parse(stored);
    const user = USERS[0];
    localStorage.setItem('nexus_current_user', JSON.stringify(user));
    return user;
  }

  isLoggedIn(): boolean {
    return this.currentUserSignal() !== null;
  }

  updateCurrentUser(data: Partial<User>): void {
    const user = this.currentUserSignal();
    if (!user) return;
    const updated = { ...user, ...data };
    this.currentUserSignal.set(updated);
    localStorage.setItem('nexus_current_user', JSON.stringify(updated));
  }

  login(username: string, password: string): boolean {
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUserSignal.set(user);
      localStorage.setItem('nexus_current_user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('nexus_current_user');
  }

  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }

  getAllUsers(): Observable<User[]> {
    return of(USERS);
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(USERS.find(u => u.id === id));
  }

  getUsers(): Observable<User[]> {
    return of(USERS);
  }

  register(data: Partial<User> & { password: string }): Observable<User> {
    const newUser: User = {
      id: USERS.length + 1,
      username: data.username || data.email || '',
      email: data.email || '',
      password: data.password,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      avatar: data.avatar || '',
      role: 'user',
      createdAt: new Date()
    };
    USERS.push(newUser);
    this.currentUserSignal.set(newUser);
    localStorage.setItem('nexus_current_user', JSON.stringify(newUser));
    return of(newUser);
  }

  forgotPassword(email: string): Observable<boolean> {
    return of(true);
  }
}
