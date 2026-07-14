import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { TaskService } from '../taskservice.service';
import { AuthService } from '../../auth/authservice.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { Task } from '../task.model';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [RouterLink, FormsModule, DatePipe, NgClass, NgFor, NgIf, PageHeaderComponent],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export class TasklistComponent implements OnInit {
  private taskService = inject(TaskService);
  private authService = inject(AuthService);

  tasks: Task[] = [];
  users: User[] = [];
  filteredTasks: Task[] = [];
  searchQuery = '';
  statusFilter = '';
  priorityFilter = '';

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilters();
    });
    this.authService.getUsers().subscribe(users => this.users = users);
  }

  getUserName(userId: number): string {
    const u = this.users.find(u => u.id === userId);
    return u ? `${u.firstName} ${u.lastName}` : 'Unknown';
  }

  applyFilters() {
    let result = [...this.tasks];
    const q = this.searchQuery.toLowerCase();
    if (q) result = result.filter(t => t.title.toLowerCase().includes(q));
    if (this.statusFilter) result = result.filter(t => t.status === this.statusFilter);
    if (this.priorityFilter) result = result.filter(t => t.priority === this.priorityFilter);
    this.filteredTasks = result;
  }

  deleteTask(id: number) {
    if (confirm('Delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.taskService.getTasks().subscribe(tasks => {
          this.tasks = tasks;
          this.applyFilters();
        });
      });
    }
  }

  getStatusClass(status: string): string {
    return 'badge-' + status;
  }

  getPriorityClass(priority: string): string {
    return 'badge-' + priority;
  }

  getRelatedTo(task: Task): string {
    if (!task.relatedTo) return '-';
    const type = task.relatedTo.type.charAt(0).toUpperCase() + task.relatedTo.type.slice(1);
    return type + ' #' + task.relatedTo.id;
  }
}
