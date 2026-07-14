import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  get isDark(): boolean {
    return this.themeService.current === 'dark';
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
