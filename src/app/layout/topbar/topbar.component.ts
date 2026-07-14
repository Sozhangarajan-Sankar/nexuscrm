import { Component, inject, Output, EventEmitter, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth/authservice.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  @Input() pageTitle: string = 'Dashboard';
  @Output() search = new EventEmitter<string>();
  @Output() menuToggle = new EventEmitter<void>();

  authService = inject(AuthService);
  notificationService = inject(NotificationService);

  userMenuOpen = false;

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  logout() {
    this.authService.logout();
  }
}
