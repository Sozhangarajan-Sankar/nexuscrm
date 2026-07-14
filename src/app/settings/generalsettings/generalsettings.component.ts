import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-generalsettings',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, PageHeaderComponent],
  templateUrl: './generalsettings.component.html',
  styleUrl: './generalsettings.component.css'
})
export class GeneralsettingsComponent implements OnInit {
  settingsForm: FormGroup;
  showNotification = false;
  notifMessage = '';
  notifType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    public theme: ThemeService
  ) {
    this.settingsForm = this.fb.group({
      companyName: ['Nexus CRM'],
      timezone: ['UTC'],
      dateFormat: ['MM/DD/YYYY'],
      currency: ['USD'],
    });
  }

  ngOnInit(): void {
    const stored = localStorage.getItem('nexus_settings');
    if (stored) {
      this.settingsForm.patchValue(JSON.parse(stored));
    }
  }

  saveSettings(): void {
    localStorage.setItem('nexus_settings', JSON.stringify(this.settingsForm.value));
    this.showNotif('Settings saved successfully', 'success');
  }

  private showNotif(msg: string, type: 'success' | 'error'): void {
    this.notifMessage = msg;
    this.notifType = type;
    this.showNotification = true;
    setTimeout(() => this.showNotification = false, 3000);
  }
}
