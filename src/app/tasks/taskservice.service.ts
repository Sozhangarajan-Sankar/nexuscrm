import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task.model';
import { TASKS } from './tasks.mock';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks = [...TASKS];

  getAll(): Observable<Task[]> {
    return of(this.tasks);
  }

  getById(id: number): Observable<Task | undefined> {
    return of(this.tasks.find(t => t.id === id));
  }

  create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Observable<Task> {
    const now = new Date();
    const newTask: Task = {
      ...task,
      id: Math.max(...this.tasks.map(t => t.id), 0) + 1,
      createdAt: now,
      updatedAt: now
    };
    this.tasks.push(newTask);
    return of(newTask);
  }

  update(id: number, changes: Partial<Task>): Observable<Task> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    this.tasks[index] = { ...this.tasks[index], ...changes, updatedAt: new Date() };
    return of(this.tasks[index]);
  }

  delete(id: number): Observable<boolean> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return of(false);
    this.tasks.splice(index, 1);
    return of(true);
  }

  getByStatus(status: Task['status']): Observable<Task[]> {
    return of(this.tasks.filter(t => t.status === status));
  }

  getByAssignedTo(userId: number): Observable<Task[]> {
    return of(this.tasks.filter(t => t.assignedTo === userId));
  }

  getTasks(): Observable<Task[]> { return this.getAll(); }
  getTaskById(id: string | number): Observable<Task | undefined> { return this.getById(typeof id === 'string' ? +id : id); }
  addTask(data: any): Observable<Task> { return this.create(data); }
  updateTask(id: string | number, data: Partial<Task>): Observable<Task> { return this.update(typeof id === 'string' ? +id : id, data); }
  deleteTask(id: string | number): Observable<boolean> { return this.delete(typeof id === 'string' ? +id : id); }
}
