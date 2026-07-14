import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('light');

  constructor() {
    const stored = localStorage.getItem('nexus_theme') as Theme;
    if (stored) this.themeSubject.next(stored);
  }

  getTheme(): Observable<Theme> {
    return this.themeSubject.asObservable();
  }

  toggle(): void {
    const next = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.themeSubject.next(next);
    localStorage.setItem('nexus_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }

  get current(): Theme {
    return this.themeSubject.value;
  }
}
