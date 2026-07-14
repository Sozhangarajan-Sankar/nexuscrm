import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
interface DealStage { stage: string; count: number; value: number; }

@Component({
  selector: 'app-dealsfunnelchart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dealsfunnelchart.component.html',
  styleUrl: './dealsfunnelchart.component.css'
})
export class DealsfunnelchartComponent {
  @Input() stages: DealStage[] = [];

  get maxValue(): number {
    return Math.max(...this.stages.map(d => d.value));
  }

  getProgressPercentage(value: number): number {
    return this.maxValue > 0 ? (value / this.maxValue) * 100 : 0;
  }

  getStageColor(index: number): string {
    const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#22c55e'];
    return colors[index % colors.length];
  }
}
