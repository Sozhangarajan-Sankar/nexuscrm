import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent {
  @Input() label!: string;
  @Input() value!: string | number;
  @Input() icon!: string;
  @Input() trend: 'up' | 'down' | 'neutral' = 'neutral';
  @Input() trendValue: string = '';
  @Input() color: string = '';
}
