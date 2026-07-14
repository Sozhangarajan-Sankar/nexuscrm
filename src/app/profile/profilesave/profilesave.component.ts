import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { AuthService } from '../../auth/authservice.service';

@Component({
  selector: 'app-profilesave',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, PageHeaderComponent],
  templateUrl: './profilesave.component.html',
  styleUrl: './profilesave.component.css'
})
export class ProfilesaveComponent implements OnInit {
  profileForm: FormGroup;
  showNotification = false;
  notifMessage = '';
  notifType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      avatar: [''],
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
    });
  }

  ngOnInit(): void {
    const user = this.auth.currentUser();
    if (user) {
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      });
    }
  }

  onAvatarChange(): void {
    // Avatar preview updates via binding
  }

  saveProfile(): void {
    if (this.profileForm.invalid) return;
    const data = this.profileForm.value;
    this.auth.updateCurrentUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      avatar: data.avatar,
    });
    this.showNotif('Profile updated successfully', 'success');
  }

  private showNotif(msg: string, type: 'success' | 'error'): void {
    this.notifMessage = msg;
    this.notifType = type;
    this.showNotification = true;
    setTimeout(() => this.showNotification = false, 3000);
  }

  resetForm(): void {
    const user = this.auth.currentUser();
    if (user) {
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      });
    }
  }
}
