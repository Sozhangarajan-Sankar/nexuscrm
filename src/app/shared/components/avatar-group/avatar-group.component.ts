import { Component, Input, computed } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-avatar-group',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './avatar-group.component.html',
  styleUrl: './avatar-group.component.css'
})
export class AvatarGroupComponent {
  @Input() users: {avatar: string; firstName: string; lastName: string}[] = [];
  @Input() max: number = 3;
  @Input() size: number = 32;

  get visibleUsers() {
    return this.users.slice(0, this.max);
  }

  get overflow() {
    return Math.max(0, this.users.length - this.max);
  }

  getInitials(user: {firstName: string; lastName: string}): string {
    return (user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '');
  }
}
