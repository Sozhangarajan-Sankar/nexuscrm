import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './loading-skeleton.component.html',
  styleUrl: './loading-skeleton.component.css'
})
export class LoadingSkeletonComponent {
  @Input() type: 'table' | 'card' | 'text' = 'text';
  @Input() rows: number = 3;
  @Input() width: string = '100%';

  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}
