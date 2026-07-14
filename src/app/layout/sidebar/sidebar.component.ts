import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgIf, NgClass } from '@angular/common';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  children?: MenuItem[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, NgIf, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() collapsed: boolean = false;
  @Output() toggle = new EventEmitter<void>();

  menuSections: MenuSection[] = [
    {
      title: 'Dashboard',
      items: [
        { label: 'Dashboard', icon: '📊', route: '/dashboard' }
      ]
    },
    {
      title: 'CRM',
      items: [
        { label: 'Customers', icon: '👥', route: '/customers' },
        { label: 'Deals', icon: '💼', route: '/deals' },
        { label: 'Tasks', icon: '✅', route: '/tasks' },
        { label: 'Invoices', icon: '📄', route: '/invoices' }
      ]
    },
    {
      title: 'Other',
      items: [
        { label: 'Activities', icon: '📋', route: '/activities' },
        { label: 'Profile', icon: '👤', route: '/profile' },
        { label: 'Settings', icon: '⚙️', route: '/settings' }
      ]
    }
  ];
}
