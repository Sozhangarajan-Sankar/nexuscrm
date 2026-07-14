import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyRevenue } from '../../dashboardservice.service';

@Component({
  selector: 'app-revenuechart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenuechart.component.html',
  styleUrl: './revenuechart.component.css'
})
export class RevenuechartComponent {
  @Input() data: MonthlyRevenue[] = [];

  get maxRevenue(): number {
    return Math.max(...this.data.map(d => d.revenue));
  }

  get yAxisLabels(): string[] {
    const max = this.maxRevenue;
    const step = Math.max(Math.ceil(max / 4 / 1000) * 1000, 1000);
    return ['$0', '$' + (step / 1000).toFixed(0) + 'K', '$' + ((step * 2) / 1000).toFixed(0) + 'K', '$' + ((step * 3) / 1000).toFixed(0) + 'K', '$' + ((step * 4) / 1000).toFixed(0) + 'K'];
  }

  getBarHeight(revenue: number): number {
    return (revenue / this.maxRevenue) * 100;
  }
}
