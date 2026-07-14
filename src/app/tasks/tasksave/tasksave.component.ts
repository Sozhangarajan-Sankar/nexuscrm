import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { TaskService } from '../taskservice.service';
import { AuthService } from '../../auth/authservice.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-tasksave',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgFor, NgIf, PageHeaderComponent],
  templateUrl: './tasksave.component.html',
  styleUrl: './tasksave.component.css'
})
export class TasksaveComponent implements OnInit {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEditMode = false;
  editId: string | null = null;
  users: User[] = [];

  taskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    status: ['todo'],
    priority: ['medium'],
    dueDate: [''],
    assignedTo: [''],
    relatedToType: [''],
    relatedToId: ['']
  });

  ngOnInit() {
    this.authService.getUsers().subscribe(u => this.users = u);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.editId = id;
        this.taskService.getTaskById(id).subscribe(task => {
          if (task) this.taskForm.patchValue(task);
        });
      }
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) return;
    const data = this.taskForm.value;
    if (this.isEditMode && this.editId) {
      this.taskService.updateTask(this.editId, data).subscribe(() => this.router.navigate(['/tasks']));
    } else {
      this.taskService.addTask(data).subscribe(() => this.router.navigate(['/tasks']));
    }
  }
}
