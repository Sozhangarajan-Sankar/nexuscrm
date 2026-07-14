import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { TaskService } from '../taskservice.service';
import { AuthService } from '../../auth/authservice.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { Task } from '../task.model';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-taskboard',
  standalone: true,
  imports: [RouterLink, DatePipe, NgClass, NgFor, NgIf, PageHeaderComponent],
  templateUrl: './taskboard.component.html',
  styleUrl: './taskboard.component.css'
})
export class TaskboardComponent implements OnInit {
  private taskService = inject(TaskService);
  private authService = inject(AuthService);

  tasks: Task[] = [];
  users: User[] = [];
  columns = [
    { name: 'To Do', status: 'todo' },
    { name: 'In Progress', status: 'in-progress' },
    { name: 'Done', status: 'done' },
  ];

  ngOnInit() {
    this.taskService.getTasks().subscribe(t => this.tasks = t);
    this.authService.getUsers().subscribe(u => this.users = u);
  }

  getTasksForStatus(status: string): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  getUserName(userId: number): string {
    const u = this.users.find(u => u.id === userId);
    return u ? `${u.firstName} ${u.lastName}` : 'Unknown';
  }

  getPriorityClass(priority: string): string {
    return 'badge-' + priority;
  }
}
