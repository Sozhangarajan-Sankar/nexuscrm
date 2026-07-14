import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() placeholder: string = 'Search...';
  @Input() debounceMs: number = 300;
  @Output() search = new EventEmitter<string>();

  private searchSubject = new Subject<string>();
  private sub!: Subscription;
  value: string = '';

  ngOnInit() {
    this.sub = this.searchSubject.pipe(debounceTime(this.debounceMs)).subscribe(value => {
      this.search.emit(value);
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.searchSubject.next(this.value);
  }

  clear() {
    this.value = '';
    this.searchSubject.next('');
  }
}
